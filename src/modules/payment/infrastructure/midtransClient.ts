import { getEnv } from '@/shared/config/midtransConfig';
import midtransClient from 'midtrans-client';

const { MIDTRANS_SERVER_KEY, MIDTRANS_IS_PRODUCTION } = getEnv();

const midtrans = new midtransClient.Snap({
    isProduction: MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: MIDTRANS_SERVER_KEY!,
});

export default midtrans;
