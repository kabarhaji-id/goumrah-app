import { Role } from "@/modules/auth/domain/role";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { Users } from "@/modules/auth/domain/users";
import { comparePassword, generateJWTToken, hashPassword } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { getIdentifierType } from "@/modules/auth/infrastructure/utils/userHelper";
import {
    ConflictError,
    DatabaseError,
    handleError,
    UnauthorizedError, UserNotFoundError,
    ValidationError
} from "@/shared/error/GlobalErrorHandler";

let userRepository: UsersRepository | null = null;
const getUserRepository = () => {
    if (!userRepository) {
        userRepository = new UsersRepository();
    }
    return userRepository;
};

export const AuthDBService = {

    /**
     * Get user by email
     * @param email string
     * @returns User or null
     */
    async getUserByEmail(email: string) {
        try {
            return await getUserRepository().getUsersByField("email", email);
        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Register a new user in the database.
     *
     * This function takes user data, validates the email, checks if the user already exists,
     * hashes the password, and creates a new user with all the provided fields.
     *
     * @async
     * @function registerUser
     * @param {Omit<Users, "userId" | "createdAt" | "updatedAt"> & { password: string }} data - User data excluding `userId`, `createdAt`, and `updatedAt`, but including a `password`.
     * @returns {Promise<Users>} The newly created user object.
     * @throws {Error} If the email is invalid, user already exists, or any error occurs during user creation.
     */
    async registerUser(data: Omit<Users, "userId" | "createdAt" | "updatedAt"> & { password: string }): Promise<Users> {
        try {
            const { email, password, ...restData } = data;

            // ✅ Validasi email
            if (!email || !email.includes("@")) {
                throw new ValidationError("Invalid email format.");
            }

            // ✅ Cek apakah user sudah ada
            const existingUser = await getUserRepository().getUsersByField("email", email);
            if (existingUser) {
                throw new ConflictError("User already exists.");
            }

            // ✅ Hash password
            const hashedPassword = await hashPassword(password);

            // ✅ Create new user dengan semua field
            return await getUserRepository().createUsers({
                ...restData,
                email,
                password: hashedPassword,
                role: data.role || Role.REGISTERED_USER, // default role
                emailVerified: null, // default null
                token: null, // default null
            });

        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Update user role
     * @param userId number
     * @param newRole Role
     * @returns Updated User
     */
    async updateUserRole(userId: number, newRole: Role) {
        try {
            if (!Object.values(Role).includes(newRole)) {
                throw new ValidationError("Invalid role");
            }
            return await getUserRepository().updateUsers(userId, { role: newRole });
        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Handle User Login
     * @param identifier (email or username or phone number)
     * @param password string
     * @returns Token & User
     */
    async login(identifier: string, password: string) {
        try {
            // ✅ Identify the field (email, username, or phone)
            const field = getIdentifierType(identifier);

            // ✅ Fetch user by field
            const user = await getUserRepository().getUsersByField(field, identifier);

            if (!user || !user.password) {
                throw new UserNotFoundError("Invalid credentials.");
            }

            // ✅ Compare password
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedError("Invalid password.");
            }

            // ✅ Generate JWT Token
            const token = await generateJWTToken(user);

            // ✅ Save token to database
            const updatedUser = await getUserRepository().updateUserToken(user.userId, token);
            if (!updatedUser) {
                throw new DatabaseError("Failed to update user token.");
            }

            return { user: updatedUser, token };

        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Get all users with a specific role
     * @param role Role
     * @returns List of Users
     */
    async getUsersByRole(role: Role) {
        try {
            return await getUserRepository().getAllUsers(role);
        } catch (error) {
            throw handleError(error);
        }
    },

    /**
     * Get user by ID
     * @param userId number
     * @returns User object
     */
    async getUsersById(userId: number) {
        try {
            return await getUserRepository().getUserById(userId);
        } catch (error) {
            throw handleError(error);
        }
    },
};
