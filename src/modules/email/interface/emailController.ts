import { NextRequest, NextResponse } from "next/server";
import {MailchimpEmailService} from "@/modules/email/application/emailServiceMailchimp";
import {EmailTemplateRepository} from "@/modules/email/infrastructure/emailTemplateRepository";
import {SendResetPassword} from "@/modules/email/application/sendResetPassword";

const emailService = new MailchimpEmailService();
const emailTemplateRepo = new EmailTemplateRepository();
const sendResetPasswordUseCase = new SendResetPassword(emailService, emailTemplateRepo);

export async function POST(req: NextRequest) {
    try {
        const { email, token } = await req.json();

        if (!email || !token) {
            return NextResponse.json({ error: "Email dan token diperlukan." }, { status: 400 });
        }

        const success = await sendResetPasswordUseCase.execute(email, token);

        if (success) {
            return NextResponse.json({ message: "Email reset password telah dikirim." });
        } else {
            return NextResponse.json({ error: "Gagal mengirim email." }, { status: 500 });
        }
    } catch (error) {
        console.error("❌ Error sending reset password email:", error); // 🔥 Log error untuk debugging
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
