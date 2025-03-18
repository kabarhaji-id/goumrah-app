import { NextRequest, NextResponse } from "next/server";
import midtrans from "@/modules/payment/infrastructure/midtransClient";
import { MidtransPaymentPayload, MidtransPaymentRespons } from "@/modules/payment/domain/Payment";
import {errorResponse, successResponse} from "@/shared/libs/responseUtils";
import { handleError } from "@/shared/error/GlobalErrorHandler";

/**
 * Creates a payment transaction using Midtrans.
 *
 * @param {NextRequest} req - The incoming request object containing payment details.
 * @returns {Promise<NextResponse>} - A response object with either the transaction details or an error message.
 */
async function createPayment(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse and validate request body
        const body = (await req.json()) as MidtransPaymentPayload;
        const { orderId, amount, customer } = body;

        if (!orderId || !amount || !customer) {
            return errorResponse(400, "Invalid payment request. Missing required fields.");
        }

        // Prepare transaction parameters
        const parameters = {
            transaction_details: { order_id: orderId, gross_amount: amount },
            customer_details: customer,
        };

        // Process payment via Midtrans
        const transaction = await midtrans.createTransaction(parameters);

        // Construct response
        const response: MidtransPaymentRespons = {
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        };

        return successResponse(200, response);
    } catch (error) {
        return handleError(error);
    }
}

export const paymentRemoteServices = { createPayment };
