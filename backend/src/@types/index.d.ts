import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends User {
      id: string;
      role: import('@prisma/client').UserRole;
    }
    interface Request {
      sessionId?: string;
    }
  }
}
