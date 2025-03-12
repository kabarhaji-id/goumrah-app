import { NextRequest, NextResponse } from "next/server";
import { ForgotPasswordService } from "@/modules/auth/application/forgotPasswordService";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import {WhatsAppService} from "@/modules/email/application/WhatsappService";
import {OTPRepository} from "@/modules/email/infrastructure/OtpRepository";
import {MailchimpEmailService} from "@/modules/email/application/emailServiceMailchimp";

// Initialize dependencies
const usersRepo = new UsersRepository();
const otpRepo = new OTPRepository();
const emailService = new MailchimpEmailService();
const whatsappService = new WhatsAppService();
const forgotPasswordService = new ForgotPasswordService(usersRepo, otpRepo, emailService, whatsappService);

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // 🛂 Parse request body
        const { identifier } = await req.json();

        // 🚨 Validate input
        if (!identifier) {
            return NextResponse.json({ message: "Email atau no telepon diperlukan." }, { status: 400 });
        }

        // 🔄 Process forgot password request
        const { success, message } = await forgotPasswordService.requestPasswordReset(identifier);

        return NextResponse.json({ message }, { status: success ? 200 : 400 });
    } catch (error) {
        console.error("❌ Forgot password error:", error);

        return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}
