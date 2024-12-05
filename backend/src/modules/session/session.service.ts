import cacheManager from "../../common/utils/cache";
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
    const cachedSession = await cacheManager.get(`session:${sessionId}`);

    if (cachedSession) {
      return { user: cachedSession };
    }
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
            role: true,
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException("Session not found");
    }
    const { user } = session;

    await cacheManager.set(`session:${sessionId}`, user, 60 * 60);

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
