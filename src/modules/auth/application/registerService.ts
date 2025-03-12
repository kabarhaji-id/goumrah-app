import {Users} from "@/modules/auth/domain/users";
import {UsersRepository} from "@/modules/auth/infrastructure/usersRepository";
import {Role} from "@/modules/auth/domain/role";
import {hashPassword} from "@/modules/auth/infrastructure/utils/sessionUtils";


const usersRepository = new UsersRepository();
export async function registerUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
}): Promise<{ success: boolean; message?: string; user?: Users }> {
    try {
        if (!data.firstName || !data.lastName || !data.email || !data.password) {
            return { success: false, message: "Harap isi semua kolom yang diperlukan." };
        }

        const existingUser = await usersRepository.getUsersByField("email", data.email);
        if (existingUser) {
            return { success: false, message: "Email sudah terdaftar." };
        }

        const hashedPassword = await hashPassword(data.password);

        const newUser = await usersRepository.createUsers({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.email, // Bisa pakai email sebagai username jika tidak diisi
            email: data.email,
            phone: data.phone || null,
            password: hashedPassword,
            emailVerified: null,
            image: null,
            role: Role.REGISTERED_USER,
        });

        return { success: true, user: newUser };
    } catch (error) {
        console.error("❌ Error saat registrasi:", error);
        return { success: false, message: "Terjadi kesalahan saat registrasi." };
    }
}
