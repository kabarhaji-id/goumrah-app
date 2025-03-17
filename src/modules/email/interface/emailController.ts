import { NextRequest, NextResponse } from "next/server";
import {MailchimpEmailService} from "@/modules/email/application/emailServiceMailchimp";
import {EmailTemplateRepository} from "@/modules/email/infrastructure/emailTemplateRepository";
import {SendResetPassword} from "@/modules/email/application/sendResetPassword";
import {errorResponse, successResponse} from "@/shared/libs/responseUtils";

const emailService = new MailchimpEmailService();
const emailTemplateRepo = new EmailTemplateRepository();
const sendResetPasswordUseCase = new SendResetPassword(emailService, emailTemplateRepo);

export async function POST(req: NextRequest) {
    try {
        const { email, token } = await req.json();

        if (!email || !token) {
            return errorResponse(400, "Email dan token diperlukan.");
        }

        const success = await sendResetPasswordUseCase.execute(email, token);

        if (success) {
            return successResponse(200,"Email reset password telah dikirim.");
        } else {
            return errorResponse( 500, "Gagal mengirim email.");
        }
    } catch {
        return errorResponse(500, "Internal Server Error");
    }
}
