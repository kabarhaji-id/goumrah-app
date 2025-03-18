export function getEnv() {
    return {
        MIDTRANS_SERVER_KEY: process.env.NEXT_MIDTRANS_SERVER_KEY!,
        MIDTRANS_CLIENT_KEY: process.env.NEXT_MIDTRANS_CLIENT_KEY!,
        MIDTRANS_IS_PRODUCTION: process.env.NEXT_MIDTRANS_IS_PRODUCTION!,
    };
}