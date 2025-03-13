import { NextRequest, NextResponse } from "next/server";
import {
    handleForgotPassword, handleGetToken, handleGetUser,
    handleLogin, handleLogout, handleRegister
} from "@/modules/auth/infrastructure/handler/HandlerAuth";
import { errorResponse } from "@/shared/libs/responseUtils";

/**
 * ✅ Object untuk mapping route ke handler yang sesuai.
 * Memudahkan ekspansi API tanpa perlu menambah banyak kode.
 */
const routeHandlers: Record<string, (req: NextRequest) => Promise<NextResponse>> = {
    "POST:/api/auth/login": handleLogin,
    "POST:/api/auth/register": handleRegister,
    "POST:/api/auth/forgot-password": handleForgotPassword,
    "POST:/api/auth/logout": handleLogout,
    "GET:/api/auth/me": handleGetUser,
    "GET:/api/auth/token": handleGetToken,
};

/**
 * ✅ Handler utama untuk menangani semua request berdasarkan metode dan endpoint.
 * @param {NextRequest} req - Request yang masuk ke server.
 * @returns {Promise<NextResponse>} Response dari API.
 */
export async function handler(req: NextRequest): Promise<NextResponse> {
    const routeKey = `${req.method}:${req.nextUrl.pathname}`;
    const handler = routeHandlers[routeKey];

    if (!handler) {
        return errorResponse(404, "Route not found");
    }

    return handler(req);
}

/**
 * ✅ Handler khusus untuk method GET.
 * @param {NextRequest} req - Request GET yang masuk.
 * @returns {Promise<NextResponse>} Response dari API.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    return handler(req);
}

/**
 * ✅ Handler khusus untuk method POST.
 * @param {NextRequest} req - Request POST yang masuk.
 * @returns {Promise<NextResponse>} Response dari API.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
    return handler(req);
}
