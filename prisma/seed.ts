import bcrypt from "bcryptjs";
import {prisma} from "@/shared/libs/prisma";

async function main() {
    console.log("🌱 Seeding database...");

    const password = await bcrypt.hash("password123", 10);

    await prisma.user.upsert({
        where: { email: "test@example.com" },
        update: {},
        create: {
            id: "user-123",
            email: "test@example.com",
            password: password,
            role: "REGISTERED_USER",
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
