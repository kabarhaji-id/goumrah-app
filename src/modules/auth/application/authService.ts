import { prisma } from "@/shared/libs/prisma";
import bcrypt from "bcryptjs";
import {Role} from "@/modules/auth/domain/role";
import {
    AuthError
} from "@/modules/auth/domain/authExceptions";

export const AuthService = {
    /**
     * Get user by email
     * @param email string
     * @returns User or null
     */
    async getUserByEmail(email: string) {
        try {
            return await prisma.user.findUnique({
                where: { email },
                select: { id: true, email: true, role: true, password: true },
            });
        } catch (error) {
            console.error("❌ Error fetching user by email:", error);
            throw new Error("Failed to fetch user.");
        }
    },

    /**
     * Register a new user with a specified role
     * @param email string
     * @param password string
     * @param role Role (default: REGISTERED_USER)
     * @returns Created User
     */
    async registerUser(email: string, password: string, role: Role = Role.REGISTERED_USER) {
        try {
            if (!Object.values(Role).includes(role)) {
                throw new Error("Invalid role.");
            }

            // ✅ Cek apakah email sudah terdaftar
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error("User already exists.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            return await prisma.user.create({
                data: { email, password: hashedPassword, role },
                select: { id: true, email: true, role: true }, // 🔍 Hindari mengembalikan password
            });
        } catch (error) {
            console.error("❌ Error registering user:", error);

            // Jika error sudah spesifik, lemparkan kembali
            if (error instanceof Error) throw error;

            // Jika tidak, pakai pesan default
            throw new Error("Failed to register user.");
        }
    },

    /**
     * Update user role
     * @param userId string
     * @param newRole Role
     * @returns Updated User
     */
    async updateUserRole(userId: string, newRole: Role) {
        if (!Object.values(Role).includes(newRole)) {
            throw new Error("Invalid role"); // 🔥 Error ini harus dilempar langsung
        }

        return prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
            select: { id: true, email: true, role: true },
        });
    },

    /**
     * Get all users with a specific role
     * @param role Role
     * @returns List of Users
     */
    async getUsersByRole(role: Role) {
        try {
            return await prisma.user.findMany({
                where: { role },
                select: { id: true, email: true, role: true },
            });
        } catch (error) {
            console.error("❌ Error fetching users by role:", error);
            throw new Error("Failed to fetch users.");
        }
    },

    /**
     * Handle User Login
     * @param identifier (email or username)
     * @param password string
     * @returns Token & User
     */
    async login(identifier: string, password: string) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier, password }),
        });

        const data = await res.json();

        console.log("🧐 Fetch Response:", data); // Cek response di sini

        if (!res.ok) {
            return { error: data?.message || "Unknown Error" };
        }

        // ✅ Akses data yang benar dari API
        const { token, user } = data?.data || {};

        return { token, user }; // ✅ Return yang benar
    }
};
