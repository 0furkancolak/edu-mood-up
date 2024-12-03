import { NotFoundException } from "../../common/utils/catch-errors";
import db from "../../database/db";

export class SessionService {
  public async getAllSession(userId: string) {
    const sessions = await db.session.findMany({
      where: {
        userId,
        expiredAt: { gt: new Date() },
      },
      select: {
        id: true,
        userId: true,
        userAgent: true,
        createdAt: true,
        expiredAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      sessions,
    };
  }

  public async getSessionById(sessionId: string) {
    const session = await db.session.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException("Session not found");
    }
    const { user } = session;

    return {
      user,
    };
  }

  public async deleteSession(sessionId: string, userId: string) {
    const deletedSession = await db.session.delete({
      where: {
        id: sessionId,
        userId,
      },
    });
    if (!deletedSession) {
      throw new NotFoundException("Session not found");
    }
    return;
  }
}
