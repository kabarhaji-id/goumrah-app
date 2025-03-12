import twilio from "twilio";

export class WhatsAppService {
    private client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    private fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    async sendWhatsAppMessage(to: string, otp: string): Promise<boolean> {
        try {
            const message = await this.client.messages.create({
                from: this.fromNumber,
                to: `whatsapp:${to}`,
                body: `Kode OTP Anda untuk reset password adalah: ${otp}`,
            });

            console.log("✅ WhatsApp OTP terkirim:", message.sid);
            return true;
        } catch (error) {
            console.error("❌ Gagal mengirim WhatsApp OTP:", error);
            return false;
        }
    }
}
