import { Role } from "./role";

export interface Users {
    userId: number;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    phone: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    token: string | null;
    role: Role | Role.REGISTERED_USER;
    createdAt: Date;
    updatedAt: Date;
}


export interface AuthUser extends Users {

    iat: number; // JWT Issued At ✅
    exp: number; // JWT Expiration ✅
}