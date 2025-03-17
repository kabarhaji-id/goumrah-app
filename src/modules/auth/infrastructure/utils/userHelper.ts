import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role";
import { Prisma } from "@prisma/client";
import {IdentifierType} from "@/modules/auth/domain/authEntity";

// ✅ Pastikan kompatibilitas Prisma
export const mapPrismaUserToUsers = (prismaUser: Prisma.UserGetPayload<false> | null): Users | null => {
    if (!prismaUser) return null; // Jika `null`, langsung return `null`

    return {
        userId: prismaUser.userId,
        firstName: prismaUser.firstName ?? null,
        lastName: prismaUser.lastName ?? null,
        username: prismaUser.username ?? null,
        phone: prismaUser.phone ?? null,
        email: prismaUser.email,
        emailVerified: prismaUser.emailVerified ?? null,
        token: prismaUser.token ?? null,
        image: prismaUser.image ?? null,
        password: prismaUser.password ?? null,
        role: prismaUser.role as Role ?? undefined,
        createdAt: prismaUser.createdAt,
        updatedAt: prismaUser.updatedAt,
    };
};

/**
 * Helper untuk menentukan tipe identifier (email, phone, atau username).
 * @param {string} identifier - Email, username, atau nomor telepon.
 * @returns {"email" | "phone" | "username"} Tipe field yang sesuai.
 */
export const getIdentifierType = (identifier: string): IdentifierType => {
    if (identifier.includes("@")) return "email";
    if (/^\d+$/.test(identifier)) return "phone";
    return "username";
};

/**
 * ✅ Filter user data to only include necessary fields.
 *
 * @param user - The full user object from the database.
 * @returns Filtered user object.
 */
export const filterUserData = (user: Users) => {
    const { firstName, lastName, username, phone, email, image, role } = user;

    return { firstName, lastName, username, phone, email, image, role };
};