import { ErrorCode } from "../../common/enums/error-code.enum";
import { VerificationEnum } from "../../common/enums/verification-code.enum";
import {
  LoginDto,
  RegisterDto,
  resetPasswordDto,
} from "../../common/interface/auth.interface";
import {
  BadRequestException,
  HttpException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/catch-errors";
import {
  anHourFromNow,
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
  threeMinutesAgo,
} from "../../common/utils/date-time";
import db from "../../database/db";
import { config } from "../../config/app.config";
import {
  refreshTokenSignOptions,
  RefreshTPayload,
  signJwtToken,
  verifyJwtToken,
} from "../../common/utils/jwt";
import { sendEmail } from "../../mailers/mailer";
import {
  passwordResetTemplate,
  verifyEmailTemplate,
} from "../../mailers/templates/template";
import { HTTPSTATUS } from "../../config/http.config";
import { hashValue } from "../../common/utils/bcrypt";
import { logger } from "../../common/utils/logger";
import crypto from "crypto";

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, email, password } = registerData;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password,
        userPreferences: {
          create: {},
        },
      },
      include: {
        userPreferences: true,
      },
    });

    const verification = await db.verificationCode.create({
      data: {
        userId: newUser.id,
        type: VerificationEnum.EMAIL_VERIFICATION,
        expiresAt: fortyFiveMinutesFromNow(),
        code: crypto.randomUUID(),
      },
    });

    const verificationUrl = `${config.APP_ORIGIN}/confirm-account?code=${verification.code}`;
    await sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verificationUrl),
    });

    return {
      user: newUser,
    };
  }

  public async login(loginData: LoginDto) {
    const { email, password, userAgent } = loginData;

    logger.info(`Login attempt for email: ${email}`);
    const user = await db.user.findUnique({
      where: { email },
      include: {
        userPreferences: true,
      },
    });

    if (!user) {
      logger.warn(`Login failed: User with email ${email} not found`);
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    const isPasswordValid = (await user.password) === password;
    if (!isPasswordValid) {
      logger.warn(`Login failed: Invalid password for email: ${email}`);
      throw new BadRequestException(
        "Invalid email or password provided",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }

    if (user.userPreferences?.enable2FA) {
      logger.info(`2FA required for user ID: ${user.id}`);
      return {
        user: null,
        mfaRequired: true,
        accessToken: "",
        refreshToken: "",
      };
    }

    logger.info(`Creating session for user ID: ${user.id}`);
    const session = await db.session.create({
      data: {
        userId: user.id,
        userAgent,
        expiredAt: calculateExpirationDate(config.JWT.REFRESH_EXPIRES_IN),
      },
    });

    logger.info(`Signing tokens for user ID: ${user.id}`);
    const accessToken = signJwtToken({
      userId: user.id,
      sessionId: session.id,
    });

    const refreshToken = signJwtToken(
      {
        sessionId: session.id,
      },
      refreshTokenSignOptions
    );

    logger.info(`Login successful for user ID: ${user.id}`);
    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: false,
    };
  }

  public async refreshToken(refreshToken: string) {
    const { payload } = verifyJwtToken<RefreshTPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });

    if (!payload) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const session = await db.session.findUnique({
      where: { id: payload.sessionId },
    });
    const now = Date.now();

    if (!session) {
      throw new UnauthorizedException("Session does not exist");
    }

    if (session.expiredAt.getTime() <= now) {
      throw new UnauthorizedException("Session expired");
    }

    const sessionRequireRefresh =
      session.expiredAt.getTime() - now <= ONE_DAY_IN_MS;

    if (sessionRequireRefresh) {
      session.expiredAt = calculateExpirationDate(
        config.JWT.REFRESH_EXPIRES_IN
      );
      await db.session.update({
        where: { id: session.id },
        data: { expiredAt: session.expiredAt },
      });
    }

    const newRefreshToken = sessionRequireRefresh
      ? signJwtToken(
        {
          sessionId: session.id,
        },
        refreshTokenSignOptions
      )
      : undefined;

    const accessToken = signJwtToken({
      userId: session.userId,
      sessionId: session.id,
    });

    return {
      accessToken,
      newRefreshToken,
    };
  }

  public async verifyEmail(code: string) {
    const validCode = await db.verificationCode.findFirst({
      where: {
        code,
        type: VerificationEnum.EMAIL_VERIFICATION,
        expiresAt: { gt: new Date() },
      },
    });

    if (!validCode) {
      throw new BadRequestException("Invalid or expired verification code");
    }

    const updatedUser = await db.user.update({
      where: { id: validCode.userId },
      data: { isEmailVerified: true },
    });

    await db.verificationCode.delete({
      where: { id: validCode.id },
    });

    return { user: updatedUser };
  }

  public async forgotPassword(email: string) {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    //check mail rate limit is 2 emails per 3 or 10 min
    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;

    const count = await db.verificationCode.count({
      where: {
        userId: user.id,
        type: VerificationEnum.PASSWORD_RESET,
        createdAt: { gt: timeAgo },
      },
    });

    if (count >= maxAttempts) {
      throw new HttpException(
        "Too many request, try again later",
        HTTPSTATUS.TOO_MANY_REQUESTS,
        ErrorCode.AUTH_TOO_MANY_ATTEMPTS
      );
    }

    const expiresAt = anHourFromNow();
    const validCode = await db.verificationCode.create({
      data: {
        userId: user.id,
        type: VerificationEnum.PASSWORD_RESET,
        expiresAt,
        code: crypto.randomUUID(),
      },
    });

    const resetLink = `${config.APP_ORIGIN}/reset-password?code=${validCode.code
      }&exp=${expiresAt.getTime()}`;

    const { data, error } = await sendEmail({
      to: user.email,
      ...passwordResetTemplate(resetLink),
    });

    if (!data) {
      throw new InternalServerException(`${error}`);
    }

    return {
      url: resetLink,
      emailId: data,
    };
  }

  public async resePassword({ password, verificationCode }: resetPasswordDto) {
    const validCode = await db.verificationCode.findFirst({
      where: {
        code: verificationCode,
        type: VerificationEnum.PASSWORD_RESET,
        expiresAt: { gt: new Date() },
      },
    });

    if (!validCode) {
      throw new NotFoundException("Invalid or expired verification code");
    }

    const hashedPassword = await hashValue(password);

    const updatedUser = await db.user.update({
      where: { id: validCode.userId },
      data: { password: hashedPassword },
    });

    if (!updatedUser) {
      throw new BadRequestException("Failed to reset password!");
    }

    await db.verificationCode.delete({
      where: { id: validCode.id },
    });

    await db.session.deleteMany({
      where: { userId: updatedUser.id },
    });

    return {
      user: updatedUser,
    };
  }

  public async logout(sessionId: string) {
    return await db.session.delete({
      where: { id: sessionId },
    });
  }
}
