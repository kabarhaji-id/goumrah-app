import { prisma } from "@/shared/libs/prisma";
import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role";
import { mapPrismaUserToUsers } from "@/modules/auth/infrastructure/utils/userHelper";
import { Prisma } from "@prisma/client";

/**
 * UsersRepository: Responsible for handling database operations related to the User entity.
 * This includes finding a user, create user, get all user updating the user's token, and clearing the token on logout.
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
            const whereCondition: Prisma.UserWhereUniqueInput | Prisma.UserWhereInput =
                field === "email" ? { email: value }
                    : field === "phone" ? { phone: value }
                        : field === "username" ? { username: value }
                            : {};

            const user = await prisma.user.findFirst({
                where: whereCondition,
            });

            return user ? { ...user, role: user.role as Role } : null;
        } catch (error) {
            console.error(`Error fetching user by ${field}:`, error);
            return null;
        }
    }


    /**
     * ✅ Save JWT Token to Database
     * This function is called after successful login to store the user's JWT token in the database.
     * @param userId - The ID of the authenticated user.
     * @param token - The generated JWT token.
     * @returns The updated user object with the saved token.
     */
    async updateUserToken(userId: string, token: string): Promise<Users | null> {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { token },
        });

        return updatedUser ? mapPrismaUserToUsers(updatedUser) : null;
    }

    /**
     * ✅ Clear User Token on Logout
     * This function is called during logout to clear the user's token from the database.
     * @param userId - The ID of the user logging out.
     * @returns The updated user object with the token field set to null.
     */
    async clearUserToken(userId: string): Promise<Users | null> {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { token: null },
        });

        return updatedUser ? mapPrismaUserToUsers(updatedUser) : null;
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
                data: {
                    ...data,
                    phone: data.phone ?? null, // ✅ Mengatasi undefined ke null
                    role: data.role as Role, // 🔥 Konversi role
                },
            });

            return { ...newUser, role: newUser.role as Role };
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
