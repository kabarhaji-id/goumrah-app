import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role";
import { Prisma } from "@prisma/client"; //

// ✅ Pastikan kompatibilitas Prisma
export const mapPrismaUserToUsers = (prismaUser: Prisma.UserGetPayload<false> | null): Users | null => {
    if (!prismaUser) return null; // Jika `null`, langsung return `null`

    return {
        id: prismaUser.id,
        firstName: prismaUser.firstName ?? null,
        lastName: prismaUser.lastName ?? null,
        username: prismaUser.username ?? null,
        phone: prismaUser.phone ?? null,
        email: prismaUser.email,
        emailVerified: prismaUser.emailVerified ?? null,
        image: prismaUser.image ?? null,
        password: prismaUser.password ?? null,
        role: prismaUser.role as Role,
        createdAt: prismaUser.createdAt,
        updatedAt: prismaUser.updatedAt,
    };
};
