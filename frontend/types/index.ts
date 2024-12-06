export interface UserDTO {
    id: string;
    email: string;
    name: string;
    image: string;
    role: UserRole;
}

export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    UNIVERSITY = "UNIVERSITY",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
}
