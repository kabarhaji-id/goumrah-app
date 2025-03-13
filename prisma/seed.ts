import bcrypt from "bcryptjs";
import { prisma } from "@/shared/libs/prisma";
import { Role } from "@/modules/auth/domain/role";

async function main() {
    console.log("🌱 Seeding database...");

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // List of users with different roles
    const users = [
        {
            id: "user-123",
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            phone: "0123456789",
            email: "test@example.com",
            password: hashedPassword,
            role: Role.REGISTERED_USER,
        },
        {
            id: "user-124",
            firstName: "Jane",
            lastName: "Smith",
            username: "janesmith",
            phone: "0987654321",
            email: "customer@example.com",
            password: hashedPassword,
            role: Role.CUSTOMER,
        },
        {
            id: "user-125",
            firstName: "Michael",
            lastName: "Johnson",
            username: "michaeljohnson",
            phone: "0111222333",
            email: "agent@example.com",
            password: hashedPassword,
            role: Role.TRAVEL_AGENT,
        },
        {
            id: "user-126",
            firstName: "Emily",
            lastName: "Williams",
            username: "emilywilliams",
            phone: "044556677",
            email: "admin@example.com",
            password: hashedPassword,
            role: Role.ADMINISTRATOR,
        },
        {
            id: "user-127",
            firstName: "David",
            lastName: "Brown",
            username: "davidbrown",
            phone: "0998877665",
            email: "support@example.com",
            password: hashedPassword,
            role: Role.CUSTOMER_SUPPORT,
        },
        {
            id: "user-128",
            firstName: "Sophia",
            lastName: "Taylor",
            username: "sophiataylor",
            phone: "0665544332",
            email: "partner@example.com",
            password: hashedPassword,
            role: Role.PARTNER,
        },
    ];

    // Upsert each user
    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                ...user,
                emailVerified: null, // Bisa diubah jika ingin diverifikasi otomatis
                image: null,
                token: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }

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
