import { JWT } from "next-auth/jwt";
import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role";
import { Session } from "next-auth";
import bcrypt from "bcrypt";

const JWT_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

/**
 * Hashes a password using bcrypt.
 * @param password - The plaintext password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plaintext password with a hashed password.
 * @param password - The plaintext password.
 * @param hashedPassword - The hashed password.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

/** 🔑 Generate JWT Token */
export function generateJWTToken(token: JWT, user: Users): JWT {
    return {
        ...token,
        id: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + JWT_MAX_AGE,
    };
}

/** 📌 Update Session with Token */
export function updateSessionWithToken(session: Session, token: JWT): Session {
    session.user = {
        ...session.user,
        id: token.id,
        role: token.role as Role,
    };
    session.accessToken = token.accessToken; // ✅ Simpan accessToken ke session
    session.expires = new Date(token.exp * 1000).toISOString();
    return session;
}
