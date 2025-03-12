import { prisma } from "@/shared/libs/prisma";

export class OTPRepository {
    async saveOTP(userId: string, otp: string): Promise<void> {
        await prisma.otp.create({
            data: {
                userId,
                otp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 🔥 OTP berlaku 10 menit
            },
        });
    }

    async verifyOTP(userId: string, otp: string): Promise<boolean> {
        const storedOtp = await prisma.otp.findFirst({
            where: { userId, otp, expiresAt: { gt: new Date() } },
        });

        return !!storedOtp;
    }
}
