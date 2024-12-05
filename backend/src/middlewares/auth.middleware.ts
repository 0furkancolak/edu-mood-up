import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../common/utils/catch-errors';
import { UserRole } from '@prisma/client';
import { ErrorCode } from '../common/enums/error-code.enum';

export const isSuperAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new UnauthorizedException(
                'Unauthorized',
                ErrorCode.ACCESS_UNAUTHORIZED
            );
        }

        if (user.role !== UserRole.SUPER_ADMIN) {
            throw new UnauthorizedException(
                'Super Admin access required',
                ErrorCode.ACCESS_FORBIDDEN
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new UnauthorizedException(
                'Unauthorized',
                ErrorCode.ACCESS_UNAUTHORIZED
            );
        }

        if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
            throw new UnauthorizedException(
                'Admin or Super Admin access required',
                ErrorCode.ACCESS_FORBIDDEN
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const isUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new UnauthorizedException(
                'Unauthorized',
                ErrorCode.ACCESS_UNAUTHORIZED
            );
        }

        next();
    } catch (error) {
        next(error);
    }
}; 