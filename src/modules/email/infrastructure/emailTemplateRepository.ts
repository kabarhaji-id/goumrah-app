import { prisma } from "@/shared/libs/prisma";
import { EmailTemplate } from "../domain/emailTemplate";

export class EmailTemplateRepository {
    async getTemplateByName(name: string): Promise<EmailTemplate | null> {
        return await prisma.emailTemplate.findUnique({ where: { name } });
    }

    async upsertTemplate(name: string, subject: string, body: string): Promise<EmailTemplate> {
        return await prisma.emailTemplate.upsert({
            where: { name },
            update: { subject, body },
            create: { name, subject, body },
        });
    }
}
