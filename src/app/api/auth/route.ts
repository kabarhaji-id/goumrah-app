import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/shared/libs/responseUtils";

import {authRemoteServices} from "@/modules/auth/application/AuthRemoteService";

/**
 * ✅ Object untuk mapping route ke handler yang sesuai.
 * Memudahkan ekspansi API tanpa perlu menambah banyak kode.
 */
const routeHandlers: Record<string, (req: NextRequest) => Promise<NextResponse>> = {
    "POST:/api/auth/login": authRemoteServices.login,
    "POST:/api/auth/register": authRemoteServices.register,
    "POST:/api/auth/forgot-password": authRemoteServices.forgotPassword,
    "POST:/api/auth/logout": authRemoteServices.logout,
    "GET:/api/auth/me": authRemoteServices.getUser,
    "GET:/api/auth/token": authRemoteServices.getToken,
};

/**
 * ✅ Handler utama untuk menangani semua request berdasarkan metode dan endpoint.
 * @param {NextRequest} req - Request yang masuk ke server.
 * @returns {Promise<NextResponse>} Response dari API.
 */
export async function handler(req: NextRequest): Promise<NextResponse> {
    const routeKey = `${req.method}:${req.nextUrl.pathname}`;
    console.log(routeKey);
    const handler = routeHandlers[routeKey];

    if (!handler) {
        console.log("Route not found");
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
