import { prisma } from "@/shared/libs/prisma";
import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role";
import { mapPrismaUserToUsers } from "@/modules/auth/infrastructure/utils/userHelper";
import { Prisma } from "@prisma/client";

/**
 * UsersRepository - Handles all database operations related to users.
 */
export class UsersRepository {
    /**
     * Retrieves all users from the database, with an optional role filter.
     * @param {Role} [role] - Optional role to filter users.
     * @returns {Promise<Users[]>} - List of users matching the criteria.
     */
    async getAllUsers(role?: Role): Promise<Users[]> {
        try {
            const users = await prisma.user.findMany({
                where: role ? { role } : undefined,
            });

            // 🔥 Fix: Hapus null values sebelum dikembalikan
            return users.map(mapPrismaUserToUsers).filter((user): user is Users => user !== null);
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    }


    /**
     * Retrieves a user based on a specific field (ID, Email, Username, Phone).
     * @param {"email" | "username" | "phone"} field - The field to search by.
     * @param {string} value - The value to match.
     * @returns {Promise<Users | null>} - The found user or null if not found.
     */
    async getUsersByField(field: "email" | "username" | "phone", value: string): Promise<Users | null> {
        try {
            let whereCondition: Prisma.UserWhereUniqueInput | Prisma.UserWhereInput = {};

            if (field === "email") {
                whereCondition = { email: value };
            } else if (field === "phone") {
                whereCondition = { phone: value };
            } else if (field === "username") {
                whereCondition = { username: value };
            } else {
                throw new Error(`Invalid field: ${field}`);
            }

            // ✅ Pastikan password diambil dari database
            const user = await prisma.user.findFirst({
                where: whereCondition,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    phone: true,
                    email: true,
                    emailVerified: true,
                    image: true,
                    password: true, // 🔥 Pastikan ini ada
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            return mapPrismaUserToUsers(user);
        } catch (error) {
            console.error(`Error fetching user by ${field}:`, error);
            return null;
        }
    }


    /**
     * Creates a new user in the database.
     * @param {Partial<Users>} data - Users data to create a new user.
     * @returns {Promise<Users>} - The newly created user.
     * @throws {Error} - If user creation fails.
     */
    async createUsers(data: Omit<Users, "id" | "createdAt" | "updatedAt"> & { password: string }): Promise<Users> {
        try {
            const newUser = await prisma.user.create({
                data,
            });

            const mappedUser = mapPrismaUserToUsers(newUser);
            if (!mappedUser) throw new Error("Failed to map created user.");

            return mappedUser;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user.");
        }
    }

    /**
     * Updates an existing user by ID.
     * @param {string} id - The ID of the user to update.
     * @param {Partial<Users>} data - The new user data.
     * @returns {Promise<Users | null>} - The updated user or null if not found.
     */
    async updateUsers(id: string, data: Partial<Users>): Promise<Users | null> {
        try {
            delete data.password; // 🔥 Hapus password dari objek

            const updatedUser = await prisma.user.update({
                where: { id },
                data,
            });

            return mapPrismaUserToUsers(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    }


    /**
     * Deletes a user from the database by ID.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<boolean>} - Returns true if successful, false otherwise.
     */
    async deleteUsers(id: string): Promise<boolean> {
        try {
            await prisma.user.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            return false;
        }
    }
}
