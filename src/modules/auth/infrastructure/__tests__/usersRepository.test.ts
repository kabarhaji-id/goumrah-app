import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { Role } from "@/modules/auth/domain/role";
import { Users } from "@/modules/auth/domain/users";
import { PrismaClient } from "@prisma/client";

// Mock Prisma Client
jest.mock("@prisma/client", () => {
    const mUser = {
        create: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            user: mUser,
        })),
    };
});

const prisma = new PrismaClient();
const mockUser: Users = {
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
    updatedAt: new Date(),
};

const usersRepository = new UsersRepository();

describe("UsersRepository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createUsers()", () => {
        test("✅ Should create a new user", async () => {
            // 🏗️ Arrange
            (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

            // 🚀 Act
            const result = await usersRepository.createUsers(mockUser);

            // ✅ Assert
            expect(result).toEqual(mockUser);
            expect(prisma.user.create).toHaveBeenCalledWith({ data: mockUser });
        });

        test("❌ Should throw an error if user creation fails", async () => {
            // 🏗️ Arrange
            (prisma.user.create as jest.Mock).mockRejectedValue(new Error("Database error"));

            // 🚀 Act & ✅ Assert
            await expect(usersRepository.createUsers(mockUser)).rejects.toThrow("Failed to create user.");
        });
    });

    describe("getUsersByField()", () => {
        test("✅ Should return a user by email", async () => {
            // 🏗️ Arrange
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

            // 🚀 Act
            const result = await usersRepository.getUsersByField("email", mockUser.email);

            // ✅ Assert
            expect(result).toEqual(mockUser);
        });

        test("❌ Should return null if user not found", async () => {
            // 🏗️ Arrange
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            // 🚀 Act
            const result = await usersRepository.getUsersByField("email", "unknown@example.com");

            // ✅ Assert
            expect(result).toBeNull();
        });
    });

    describe("getAllUsers()", () => {
        test("✅ Should return all users", async () => {
            // 🏗️ Arrange
            (prisma.user.findMany as jest.Mock).mockResolvedValue([mockUser]);

            // 🚀 Act
            const result = await usersRepository.getAllUsers();

            // ✅ Assert
            expect(result).toEqual([mockUser]);
        });

        test("✅ Should return users filtered by role", async () => {
            // 🏗️ Arrange
            (prisma.user.findMany as jest.Mock).mockResolvedValue([mockUser]);

            // 🚀 Act
            const result = await usersRepository.getAllUsers(Role.REGISTERED_USER);

            // ✅ Assert
            expect(result).toEqual([mockUser]);
        });

        test("❌ Should return empty array if no users found", async () => {
            // 🏗️ Arrange
            (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

            // 🚀 Act
            const result = await usersRepository.getAllUsers(Role.ADMINISTRATOR);

            // ✅ Assert
            expect(result).toEqual([]);
        });
    });

    describe("updateUsers()", () => {
        test("✅ Should update user details", async () => {
            const updatedUser = { ...mockUser, role: Role.ADMINISTRATOR };
            // 🏗️ Arrange
            (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

            // 🚀 Act
            const result = await usersRepository.updateUsers(mockUser.id, { role: Role.ADMINISTRATOR });

            // ✅ Assert
            expect(result).toEqual(updatedUser);
            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { id: mockUser.id },
                data: { role: Role.ADMINISTRATOR },
            });
        });

        test("❌ Should return null if user update fails", async () => {
            // 🏗️ Arrange
            (prisma.user.update as jest.Mock).mockRejectedValue(new Error("Update failed"));

            // 🚀 Act
            const result = await usersRepository.updateUsers(mockUser.id, { role: Role.ADMINISTRATOR });

            // ✅ Assert
            expect(result).toBeNull();
        });
    });

    describe("deleteUsers()", () => {
        test("✅ Should delete user and return true", async () => {
            // 🏗️ Arrange
            (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

            // 🚀 Act
            const result = await usersRepository.deleteUsers(mockUser.id);

            // ✅ Assert
            expect(result).toBe(true);
        });

        test("❌ Should return false if user deletion fails", async () => {
            // 🏗️ Arrange
            (prisma.user.delete as jest.Mock).mockRejectedValue(new Error("Delete failed"));

            // 🚀 Act
            const result = await usersRepository.deleteUsers(mockUser.id);

            // ✅ Assert
            expect(result).toBe(false);
        });
    });
});

