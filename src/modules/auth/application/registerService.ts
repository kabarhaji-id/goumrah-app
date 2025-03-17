import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { Role } from "@/modules/auth/domain/role";
import { hashPassword } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { successResponse, errorResponse } from "@/shared/libs/responseUtils";
import { Users } from "@/modules/auth/domain/users";
import { ConflictError, ValidationError, handleError } from "@/shared/error/GlobalErrorHandler";

const usersRepository = new UsersRepository();

/**
 * Register a new user in the database.
 *
 * @param {Users} data - User data to register.
 * @returns {Promise<object>} The response object containing the status code and data.
 */
export async function registerUser(data: Users) {
    try {
        const { firstName, lastName, email, phone, username, password } = data;

        // ✅ Validasi input
        if (!firstName || !lastName || !email || !username || !password) {
            throw new ValidationError("Harap isi semua kolom yang diperlukan.");
        }

        // ✅ Cek apakah email, phone, atau username sudah terdaftar
        const existingUserByEmail = await usersRepository.getUsersByField("email", email);
        const existingUserByPhone = phone ? await usersRepository.getUsersByField("phone", phone) : null;
        const existingUserByUsername = await usersRepository.getUsersByField("username", username);

        if (existingUserByPhone || existingUserByUsername || existingUserByEmail) {
            throw new ConflictError("Email, nomor telepon, atau username sudah terdaftar.");
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Buat user baru
        const newUser = await usersRepository.createUsers({
            firstName,
            lastName,
            username: email, // Gunakan email sebagai username
            email,
            phone: phone || null, // Handle undefined ke null
            password: hashedPassword,
            role: Role.REGISTERED_USER,
            emailVerified: null, // ✅ Tambahkan field opsional
            image: null,         // ✅ Tambahkan field opsional
            token: null
        });

        return successResponse(201, newUser);
    } catch (error) {
        return handleError(error);
    }
}
