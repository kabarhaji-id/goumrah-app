import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // List of users with different roles
    const users = [
        {
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            phone: "0123456789",
            email: "test@example.com",
            password: hashedPassword,
            role: Role.REGISTERED_USER,
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            username: "janesmith",
            phone: "0987654321",
            email: "customer@example.com",
            password: hashedPassword,
            role: Role.CUSTOMER,
        },
        {
            firstName: "Michael",
            lastName: "Johnson",
            username: "michaeljohnson",
            phone: "0111222333",
            email: "agent@example.com",
            password: hashedPassword,
            role: Role.TRAVEL_AGENT,
        },
        {
            firstName: "Emily",
            lastName: "Williams",
            username: "emilywilliams",
            phone: "044556677",
            email: "admin@example.com",
            password: hashedPassword,
            role: Role.ADMINISTRATOR,
        },
        {
            firstName: "David",
            lastName: "Brown",
            username: "davidbrown",
            phone: "0998877665",
            email: "support@example.com",
            password: hashedPassword,
            role: Role.CUSTOMER_SUPPORT,
        },
        {
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
                emailVerified: null,
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
