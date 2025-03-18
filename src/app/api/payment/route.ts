import {NextRequest, NextResponse} from 'next/server';
import {paymentRemoteServices} from "@/modules/payment/application/RemotePaymentService";

export async function POST(req: NextRequest): Promise<NextResponse> {
    return await paymentRemoteServices.createPayment(req);
}
