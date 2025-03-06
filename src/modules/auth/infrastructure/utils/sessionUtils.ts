import { JWT } from "next-auth/jwt";
import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role";
import { Session } from "next-auth";

const JWT_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

/** 🔐 Validate Password */
export async function validatePassword(enteredPassword: string, userPassword: string): Promise<boolean> {
    const bcrypt = await import("bcryptjs");
    return bcrypt.compare(enteredPassword, userPassword);
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
    session.expires = new Date(token.exp * 1000).toISOString();
    return session;
}
