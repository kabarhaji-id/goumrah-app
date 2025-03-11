import bcrypt from "bcryptjs";
import {prisma} from "@/shared/libs/prisma";
import {Role} from "@/modules/auth/domain/role";

async function main() {
    console.log("🌱 Seeding database...");

    const password = await bcrypt.hash("password123", 10);

    await prisma.user.upsert({
        where: { email: "test@example.com" },
        update: {},
        create: {
            id: "user-123",
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            phone: "0123456789",
            email: "test@example.com",
            emailVerified: null,  // Bisa diubah jika ingin diverifikasi otomatis
            image: null,
            password: password,
            role: Role.REGISTERED_USER,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    console.log("✅ Seeding completed!");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
