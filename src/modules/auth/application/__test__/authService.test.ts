import { AuthService } from "@/modules/auth/application/authService";
import { prisma } from "@/shared/libs/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@/modules/auth/domain/role";

// Mock Prisma methods
jest.mock("@/shared/libs/prisma", () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            findMany: jest.fn(),
        },
    },
}));

jest.mock("bcryptjs", () => ({
    hash: jest.fn(),
}));

const mockUser = {
    id: "user-123",
    firstName: "Test",
    lastName: "User",
    username: "testuser",
    email: "test@example.com",
    emailVerified: null,
    image: null,
    password: "$2b$10$CQQADiA4a6VLk4cPbYbCMOcQ.v3HufoEsjXPg1iDaZ4Ejk4XqEy0C",
    role: Role.REGISTERED_USER,
    createdAt: new Date(),
    updatedAt: new Date()
};

describe("AuthService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getUserByEmail()", () => {
        test("✅ Should return user when email exists", async () => {
            // 🏗️ Arrange
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

            // 🚀 Act
            const result = await AuthService.getUserByEmail(mockUser.email);

            // ✅ Assert
            expect(result).toEqual(mockUser);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { email: mockUser.email },
                select: { id: true, email: true, role: true, password: true },
            });

        });

        test("❌ Should return null when email does not exist", async () => {
            // 🏗️ Arrange
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            // 🚀 Act
            const result = await AuthService.getUserByEmail("nonexistent@example.com");

            // ✅ Assert
            expect(result).toBeNull();
        });
    });

    describe("registerUser()", () => {
        test("✅ Should create and return a new user", async () => {
            // 🏗️ Arrange
            const hashedPassword = "hashed_password";
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
            (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

            // 🚀 Act
            const result = await AuthService.registerUser(mockUser.email, "password123");

            // ✅ Assert
            expect(result).toEqual(mockUser);
            expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: { email: mockUser.email, password: hashedPassword, role: Role.REGISTERED_USER },
                select: { id: true, email: true, role: true },
            });

        });

        test("❌ Should throw error if role is invalid", async () => {
            // 🚀 Act & ✅ Assert
            await expect(
                AuthService.registerUser(mockUser.email, "password123", "INVALID_ROLE" as Role)
            ).rejects.toThrow("Invalid role");
        });

    });

    describe("updateUserRole()", () => {
        test("✅ Should update user role", async () => {
            // 🏗️ Arrange
            const updatedUser = { ...mockUser, role: Role.ADMINISTRATOR };
            (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

            // 🚀 Act
            const result = await AuthService.updateUserRole(mockUser.id, Role.ADMINISTRATOR);

            // ✅ Assert
            expect(result).toEqual(updatedUser);
            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { id: mockUser.id },
                data: { role: Role.ADMINISTRATOR },
                select: { id: true, email: true, role: true }, // 🔥 Tambahkan ini sesuai implementasi
            });
        });

        test("❌ Should throw error if role is invalid", async () => {
            // 🚀 Act & ✅ Assert
            await expect(AuthService.updateUserRole(mockUser.id, "INVALID_ROLE" as Role)).rejects.toThrow("Invalid role");
        });
    });

    describe("getUsersByRole()", () => {
        test("✅ Should return users with specified role", async () => {
            // 🏗️ Arrange
            const users = [mockUser, { ...mockUser, id: "user-456" }];
            (prisma.user.findMany as jest.Mock).mockResolvedValue(users);

            // 🚀 Act
            const result = await AuthService.getUsersByRole(Role.REGISTERED_USER);

            // ✅ Assert
            expect(result).toEqual(users);
            expect(prisma.user.findMany).toHaveBeenCalledWith({
                where: { role: Role.REGISTERED_USER },
                select: { id: true, email: true, role: true }, // ✅ Tambahkan ini agar cocok dengan query asli
            });
        });

        test("❌ Should return an empty array if no users found", async () => {
            // 🏗️ Arrange
            (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

            // 🚀 Act
            const result = await AuthService.getUsersByRole(Role.CUSTOMER);

            // ✅ Assert
            expect(result).toEqual([]);
        });
    });
});
