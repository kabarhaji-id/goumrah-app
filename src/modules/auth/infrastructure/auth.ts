import NextAuth, { User as NextAuthUser, NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { Users } from "@/modules/auth/domain/users";
import { JWT } from "next-auth/jwt";
import { generateJWTToken, updateSessionWithToken, validatePassword } from "@/modules/auth/infrastructure/utils/sessionUtils";

const usersRepository = new UsersRepository();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<Users | null> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const user = await usersRepository.getUsersByField("email", credentials.email);
                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
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
        async jwt({ token, user }: { token: JWT; user?: Users | NextAuthUser | AdapterUser }) {
            return user ? generateJWTToken(token, user as Users) : token;
        },
        async session({ session, token }) {
            return updateSessionWithToken(session, token);
        },
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
