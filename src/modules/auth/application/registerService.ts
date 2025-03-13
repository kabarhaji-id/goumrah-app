import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { Role } from "@/modules/auth/domain/role";
import { hashPassword } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { successResponse, errorResponse } from "@/shared/libs/responseUtils";
import {EmailAlreadyExistsError, ValidationError} from "@/modules/auth/domain/authExceptions";
import {Users} from "@/modules/auth/domain/users";

const usersRepository = new UsersRepository();

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
            throw new EmailAlreadyExistsError(); // 🔥 Untuk nomor telepon
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
    } catch {
        return errorResponse(500, "Terjadi kesalahan internal server.");
    }
}
