import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Role } from "@/modules/auth/domain/users"; // Sesuaikan path

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: Role;
        } & DefaultSession["user"];
        accessToken?: string; // ✅ Tambahkan accessToken ke dalam session
    }

    interface User extends DefaultUser {
        id: string;
        role: Role;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: Role;
        exp: number;
        accessToken?: string; // ✅ Tambahkan accessToken ke dalam JWT
    }
}
