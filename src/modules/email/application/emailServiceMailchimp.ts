import axios from "axios";
import { EmailService } from "@/modules/email/application/emailService";

export class MailchimpEmailService implements EmailService {
    async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
        try {
            await axios.post(
                `https://${process.env.MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/messages/send`,
                {
                    message: {
                        from_email: "support@yourdomain.com",
                        subject,
                        to: [{ email: to, type: "to" }],
                        html: body,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("✅ Email terkirim ke:", to);
            return true;
        } catch (error) {
            console.error("❌ Gagal mengirim email:", error);
            return false;
        }
    }
}
