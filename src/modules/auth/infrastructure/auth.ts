import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { Users } from "@/modules/auth/domain/users";
import { JWT } from "next-auth/jwt";
import { loginSchema } from "@/modules/auth/infrastructure/utils/authValidation";
import { validatePassword } from "@/modules/auth/infrastructure/utils/sessionUtils";

const usersRepository = new UsersRepository();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email / Phone / Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<Users | null> {
                try {
                    console.log("🟡 Received Credentials:", credentials);

                    if (!credentials?.identifier || !credentials?.password) {
                        console.error("❌ Missing credentials");
                        return null;
                    }

                    // ✅ Validasi menggunakan Zod
                    const parsedCredentials = loginSchema.parse({
                        identifier: credentials.identifier,
                        password: credentials.password,
                    });

                    const { identifier, password } = parsedCredentials;

                    // ✅ Tentukan apakah input adalah email, username, atau phone
                    let field: "email" | "phone" | "username";

                    if (identifier.includes("@")) {
                        field = "email";
                    } else if (/^\d+$/.test(identifier)) {
                        field = "phone";
                    } else {
                        field = "username";
                    }

                    console.log(`🔹 Logging in with ${field}:`, identifier);

                    // ✅ Cari user berdasarkan field yang benar
                    const user = await usersRepository.getUsersByField(field, identifier);
                    console.log("🔹 Query Result:", user);

                    if (!user || !user.password) {
                        console.error("❌ User not found or missing password");
                        return null;
                    }

                    // ✅ Validasi password dengan bcrypt
                    const passwordMatch = await validatePassword(password, user.password);
                    if (!passwordMatch) {
                        console.error("❌ Incorrect password");
                        return null;
                    } else {
                        console.error("Correct password");
                    }

                    console.log("✅ Login successful!");

                    return {
                        id: user.id,
                        firstName: user.firstName ?? null,
                        lastName: user.lastName ?? null,
                        username: user.username ?? null,
                        phone: user.phone ?? null,
                        email: user.email,
                        emailVerified: user.emailVerified ?? null,
                        image: user.image ?? null,
                        password: null, // ✅ Jangan pernah mengembalikan password
                        role: user.role,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    } as Users;
                } catch (error) {
                    console.error("❌ Authorization Error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: Users | NextAuthUser | AdapterUser }) {
            if (user) {
                console.log("🔹 Generating JWT Token for User:", user);
                token.id = user.id;
                token.name = `${(user as Users).firstName ?? ""} ${(user as Users).lastName ?? ""}`.trim();
                token.email = user.email;
                token.phone = (user as Users).phone;
                token.role = (user as Users).role;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("🔹 Updating session with token:", token);
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.phone = token.phone;
                session.user.role = token.role;
            }
            return session;
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
