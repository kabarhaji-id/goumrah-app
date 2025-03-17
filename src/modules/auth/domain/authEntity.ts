import {JWTPayload} from "jose";
import {Role} from "@/modules/auth/domain/role";

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    userId: string;
    token: string;
    expiresIn: number;
}


export type IdentifierType = "username" | "phone" | "email";

/**
 * ✅ Struktur payload JWT
 */
export interface TokenPayload extends JWTPayload {
    userId: number;
    email: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    image: string | null;
    role: Role;
}