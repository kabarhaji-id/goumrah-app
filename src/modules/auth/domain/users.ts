import { Role } from "./role";

export interface Users {
    id: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    phone: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    token: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}


export interface AuthUser extends Users {

    iat: number; // JWT Issued At ✅
    exp: number; // JWT Expiration ✅
}