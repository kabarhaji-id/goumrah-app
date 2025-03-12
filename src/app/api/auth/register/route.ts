import { NextResponse } from "next/server";
import { hashPassword } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { Role } from "@/modules/auth/domain/role";

const usersRepository = new UsersRepository();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, identifier, password } = body;

        // ✅ Validasi input
        if (!firstName || !lastName || !identifier || !password) {
            return NextResponse.json({ success: false, message: "Harap isi semua kolom." }, { status: 400 });
        }

        // ✅ Cek apakah user sudah terdaftar berdasarkan email atau username
        const existingUser = await usersRepository.getUsersByField("email", identifier);
        if (existingUser) {
            return NextResponse.json({ success: false, message: "Email sudah terdaftar." }, { status: 409 });
        }

        // 🔒 Hash password sebelum disimpan
        const hashedPassword = await hashPassword(password);

        // 🔹 Buat user baru di database
        const newUser = await usersRepository.createUsers({
            firstName,
            lastName,
            username: identifier,
            email: identifier,
            phone: null,
            password: hashedPassword,
            emailVerified: null,
            image: null,
            role: Role.REGISTERED_USER,
        });

        return NextResponse.json({ success: true, user: newUser }, { status: 201 });

    } catch (error) {
        console.error("❌ Error saat registrasi:", error);
        return NextResponse.json({ success: false, message: "Terjadi kesalahan saat registrasi." }, { status: 500 });
    }
}
