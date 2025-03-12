import {EmailService} from "@/modules/email/application/emailService";
import {EmailTemplateRepository} from "@/modules/email/infrastructure/emailTemplateRepository";

export class SendResetPassword {
    constructor(
        private readonly emailService: EmailService,
        private readonly emailTemplateRepo: EmailTemplateRepository
    ) {}

    async execute(email: string, token: string): Promise<boolean> {
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

        // ✅ Ambil template dari database
        const template = await this.emailTemplateRepo.getTemplateByName("reset_password");
        if (!template) {
            console.error("❌ Template email reset password tidak ditemukan.");
            return false;
        }

        // ✅ Gunakan fallback jika body atau subject null
        const emailBody = (template.body ?? "Klik link berikut untuk reset password: {{link}}").replace("{{link}}", resetUrl);
        const emailSubject = template.subject ?? "Reset Password Anda";

        return await this.emailService.sendEmail(email, emailSubject, emailBody);
    }
}
