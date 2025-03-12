export interface EmailTemplate {
    id: string;
    name: string | null;
    subject: string | null;
    body: string  | null;
    createdAt: Date | null;
    createdBy: string | null;
    updatedAt: Date | null;
    updatedBy: string | null;
    deletedAt: Date | null;
    deleteBy: string | null;
}


export interface MailchimpResponse {
    id: string;
    status: string;
    reject_reason?: string;
    email: string;
}

export interface EmailResult {
    success: boolean;
    message: string;
    data?: MailchimpResponse | string;
}