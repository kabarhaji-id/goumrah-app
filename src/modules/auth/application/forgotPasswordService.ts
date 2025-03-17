import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { generateOTP } from "@/shared/libs/utils";
import { OTPRepository } from "@/modules/email/infrastructure/OtpRepository";
import { EmailService } from "@/modules/email/application/emailService";
import { WhatsAppService } from "@/modules/email/application/WhatsappService";
import {handleError, UserNotFoundError, ValidationError} from "@/shared/error/GlobalErrorHandler";

export class ForgotPasswordService {
    constructor(
        private readonly usersRepo: UsersRepository,
        private readonly otpRepo: OTPRepository,
        private readonly emailService: EmailService,
        private readonly whatsappService: WhatsAppService
    ) {}

    /**
     * Request a password reset by sending an OTP via email or WhatsApp.
     * @param identifier User's email or phone number.
     * @returns Object containing success status and message.
     */
    async requestPasswordReset(identifier: string): Promise<{ success: boolean; message: string }> {
        try {
            let field: "email" | "phone";

            if (identifier.includes("@")) {
                field = "email";
            } else if (/^\d+$/.test(identifier)) {
                field = "phone";
            } else {
                throw new ValidationError("Format email atau no telepon tidak valid.");
            }

            const user = await this.usersRepo.getUsersByField(field, identifier);
            if (!user) {
                throw new UserNotFoundError(`Akun dengan ${field} ini tidak ditemukan.`);
            }

            const otp = generateOTP();
            await this.otpRepo.saveOTP(user.userId, otp);

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

        } catch (error) {
            throw handleError(error);
        }
    }
}