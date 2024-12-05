
import cacheManager from "../../common/utils/cache";
import db from "../../database/db";

export class UserService {
  public async findUserById(userId: string) {

    const cachedUser = await cacheManager.get(`user:${userId}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isEmailVerified: true,
        role: true
      },
    });

    if (!user) {
      return null;
    }

    await cacheManager.set(`user:${userId}`, user, 60 * 60);

    return user;
  }
}
