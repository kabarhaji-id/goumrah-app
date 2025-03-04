import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";  // Correct import
import * as bcrypt from "bcryptjs";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { JWT } from "next-auth/jwt";
import {Users} from "@/modules/auth/domain/users";

const usersRepository = new UsersRepository();
const JWT_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

// Helper function to compare passwords
async function validatePassword(credentialsPassword: string, userPassword: string) {
    return bcrypt.compare(credentialsPassword, userPassword);
}

// Helper function to manage JWT token
function manageJWTToken(token: JWT, user: Users) {
    token.role = user.role;
    token.exp = Math.floor(Date.now() / 1000) + JWT_MAX_AGE;
    return token;
}

// Helper function to manage session
function manageSession(session: any, token: JWT) {
    if (!token) {
        throw new Error("Invalid token");
    }

    session.user = { ...session.user, role: token.role };
    if (typeof token.exp === "number") {
        session.expires = new Date(token.exp * 1000).toISOString();
    } else {
        throw new Error("Token expiration is missing or invalid");
    }

    return session;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const user = await usersRepository.getUsersByField("email", credentials.email);

                if (!user) {
                    throw new Error("User not found");
                }

                if (!user.password) {
                    throw new Error("Invalid user data");
                }

                const passwordMatch = await validatePassword(credentials.password, user.password);

                if (!passwordMatch) {
                    throw new Error("Invalid credentials");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                return manageJWTToken(token, user);
            }

            // Token expiration check
            if (typeof token.exp === "number" && Date.now() >= token.exp * 1000) {
                throw new Error("Token expired");
            }

            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            return manageSession(session, token);
        },
    },
    session: { strategy: "jwt", maxAge: JWT_MAX_AGE },
    jwt: { maxAge: JWT_MAX_AGE },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
