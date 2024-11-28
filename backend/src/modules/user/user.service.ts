import db from "../../database/db";

export class UserService {
  public async findUserById(userId: string) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isEmailVerified: true
      },
    });
    return user || null;
  }
}
