import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";

import {generateOTP} from "@/shared/libs/utils";
import {OTPRepository} from "@/modules/email/infrastructure/OtpRepository";
import {EmailService} from "@/modules/email/application/emailService";
import {WhatsAppService} from "@/modules/email/application/WhatsappService";

export class ForgotPasswordService {
    constructor(
        private readonly usersRepo: UsersRepository,
        private readonly otpRepo: OTPRepository,
        private readonly emailService: EmailService,
        private readonly whatsappService: WhatsAppService
    ) {}

    async requestPasswordReset(identifier: string): Promise<{ success: boolean; message: string }> {
        let field: "email" | "phone";
        if (identifier.includes("@")) {
            field = "email";
        } else if (/^\d+$/.test(identifier)) {
            field = "phone";
        } else {
            return { success: false, message: "Format email atau no telepon tidak valid." };
        }

        const user = await this.usersRepo.getUsersByField(field, identifier);
        if (!user) {
            return { success: false, message: `Akun dengan ${field} ini tidak ditemukan.` };
        }

        const otp = generateOTP();
        await this.otpRepo.saveOTP(user.id, otp);

        if (field === "email") {
            const emailSent = await this.emailService.sendEmail(
                user.email!,
                "Reset Password OTP",
                `<p>Gunakan kode berikut untuk mereset password Anda: <b>${otp}</b></p>`
            );
            if (!emailSent) {
                return { success: false, message: "Gagal mengirim email OTP." };
            }
        } else {
            const waSent = await this.whatsappService.sendWhatsAppMessage(user.phone!, otp);
            if (!waSent) {
                return { success: false, message: "Gagal mengirim OTP ke WhatsApp." };
            }
        }

        return { success: true, message: "Kode OTP telah dikirim ke email atau WhatsApp Anda." };
    }
}
