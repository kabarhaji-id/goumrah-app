export type MidtransPaymentPayload = {
    orderId: string;
    amount: number;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
};

export type MidtransPaymentRespons = {
    token: string;
    redirect_url: string;
};
