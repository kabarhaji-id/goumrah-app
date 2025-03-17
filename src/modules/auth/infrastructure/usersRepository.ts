import {prisma}  from '@/shared/libs/prisma';
import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role";
import { mapPrismaUserToUsers } from "@/modules/auth/infrastructure/utils/userHelper";
import {DatabaseError, ValidationError} from "@/shared/error/GlobalErrorHandler";

/**
 * UsersRepository: Responsible for handling database operations related to the User entity.
 * This includes finding a user, create user, get users updating the user's token, and clearing the token on logout.
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
        } catch {
            return [];
        }
    }

    /**
     * Retrieves a user by email, phone, or username.
     * @param {"email" | "username" | "phone"} field - Field to search by.
     * @param {string} value - Value to match.
     * @returns {Promise<Users | null>} - User or null if not found.
     */
    async getUsersByField(field: "email" | "username" | "phone", value: string): Promise<Users | null> {
        try {
            const user = await prisma.user.findFirst({
                where: { [field]: value },
            });

            return user ? mapPrismaUserToUsers(user) : null;
        } catch (error) {
            console.error(`❌ Error fetching user by ${field}:`, error);
            return null;
        }
    }

    /**
     * Retrieves a user based on ID (for auth checking after login).
     * @param {number} userId - The user ID.
     * @returns {Promise<Users | null>} - The found user or null if not found.
     */
    async getUserById(userId: number): Promise<Users | null> {
        console.log("USER REPOSITORY : " + userId)
        try {
            // Fetch user by userId using Prisma Client
            const user = await prisma.user.findUnique({
                where: { userId: userId },
            });

            // If user exists, map the Prisma user model to your custom Users model
            return user ? mapPrismaUserToUsers(user) : null;
        } catch (error) {
            // Log any errors that occur during the fetch
            console.error(`Error fetching user by ID:`, error);
            return null; // Return null if there's an error
        }
    }




    /**
     * ✅ Save JWT Token to Database
     * This function is called after successful login to store the user's JWT token in the database.
     * @param userId - The ID of the authenticated user.
     * @param token - The generated JWT token.
     * @returns The updated user object with the saved token.
     */
    async updateUserToken(userId: number, token: string): Promise<Users | null> {
        const updatedUser = await prisma.user.update({
            where: { userId },
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
    async clearUserToken(userId: number): Promise<Users | null> {
        const updatedUser = await prisma.user.update({
            where: { userId },
            data: { token: null },
        });

        return updatedUser ? mapPrismaUserToUsers(updatedUser) : null;
    }

    /**
     * Create a new user in the database
     *
     * @param {Omit<Users, "userId" | "createdAt" | "updatedAt"> & { password: string }} data - User data to be saved
     * @returns {Promise<Users>} - The newly created user
     * @throws {DatabaseError} - If there is an issue while creating the user
     */
    async createUsers(data: Omit<Users, "userId" | "createdAt" | "updatedAt"> & { password: string }): Promise<Users> {
        try {
            const newUser = await prisma.user.create({
                data: {
                    firstName: data.firstName ?? null,
                    lastName: data.lastName ?? null,
                    username: data.username ?? null,
                    phone: data.phone ?? null,
                    email: data.email,
                    emailVerified: data.emailVerified ?? null, // ✅ default null
                    image: data.image ?? null,
                    password: data.password, // ✅ Password already hashed
                    token: data.token ?? null, // ✅ default null
                    role: data.role ?? undefined,

                },
            });

            return mapPrismaUserToUsers(newUser) as Users;
        } catch {
            // ✅ Throw a custom DatabaseError
            throw new DatabaseError("Failed to create user.");
        }
    }

    /**
     * Update user data, excluding password updates.
     *
     * @param userId - The ID of the user to be updated.
     * @param data - Partial user data to be updated.
     * @returns The updated user or null if an error occurs.
     * @throws ValidationError - When attempting to update the password directly.
     */
    async updateUsers(userId: number, data: Partial<Users>): Promise<Users | null> {
        try {
            // ✅ Prevent password update directly
            if (data.password) {
                throw new ValidationError("Password update is not allowed directly.");
            }

            // ✅ Perform update in the database
            const updatedUser = await prisma.user.update({
                where: { userId },
                data: {
                    ...data,
                    userId: undefined,
                },
            });

            return mapPrismaUserToUsers(updatedUser);
        } catch (error) {
            console.error("❌ Error updating user:", error);

            // ✅ Handle known error types
            if (error instanceof ValidationError) {
                throw error;
            }

            // ✅ Return null for other unexpected errors
            return null;
        }
    }




    /**
     * Deletes a user from the database by ID.
     * @param {number} userId - The ID of the user to delete.
     * @returns {Promise<boolean>} - Returns true if successful, false otherwise.
     */
    async deleteUsers(userId: number): Promise<boolean> {
        try {
            await prisma.user.delete({ where: { userId } });
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            return false;
        }
    }
}
