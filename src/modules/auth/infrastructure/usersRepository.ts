import { prisma } from "@/shared/libs/prisma";
import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role";
import { Role as PrismaRole, User as PrismaUser } from "@prisma/client";

/**
 * UsersRepository - Handles all database operations related to users.
 */
export class UsersRepository {
    /**
     * Creates a new user in the database.
     * @param {Partial<Users>} data - Users data to create a new user.
     * @returns {Promise<Users>} - The newly created user.
     * @throws {Error} - If user creation fails.
     */
    async createUsers(data: Omit<Users, "id"> & { email: string }): Promise<Users> {
        try {
            const newUser = await prisma.user.create({ data });

            return { ...newUser, role: newUser.role as Role };
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user.");
        }
    }


    /**
     * Retrieves a user based on a specific field (ID, Email, or Username).
     * @param {"id" | "email" | "username"} field - The field to search by.
     * @param {string} value - The value to match.
     * @returns {Promise<Users | null>} - The found user or null if not found.
     */
    async getUsersByField(field: "id" | "email" | "username", value: string): Promise<Users | null> {
        try {
            let user: PrismaUser | null = null;

            if (field === "id") {
                user = await prisma.user.findUnique({ where: { id: value } });
            } else if (field === "email") {
                user = await prisma.user.findUnique({ where: { email: value } });
            } else if (field === "username") {
                user = await prisma.user.findFirst({ where: { username: value } }); // findFirst() untuk username
            }

            return user ? { ...user, role: user.role as Role } : null;
        } catch (error) {
            console.error(`Error fetching user by ${field}:`, error);
            return null;
        }
    }



    /**
     * Retrieves all users from the database, with an optional role filter.
     * @param {Role} [role] - Optional role to filter users.
     * @returns {Promise<Users[]>} - List of users matching the criteria.
     */
    async getAllUsers(role?: Role): Promise<Users[]> {
        try {
            const users: PrismaUser[] = await prisma.user.findMany({
                where: role ? { role: role as PrismaRole } : undefined,
            });

            return users.map((user: PrismaUser) => ({ ...user, role: user.role as Role }));
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
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
            const updatedUser: PrismaUser = await prisma.user.update({
                where: { id },
                data,
            });

            return { ...updatedUser, role: updatedUser.role as Role };
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
