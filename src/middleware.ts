import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/shared/middleware/authMiddleware";
import { protectedRoutes, excludedRoutes, allowedRoles } from "@/shared/config/routeConfig";
import {applySecurityHeaders, rateLimit} from "@/shared/middleware/corsMiddleware";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Bypass for excluded routes (e.g., login, register, public API)
    if (excludedRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Rate Limiting Handler
    const rateLimitResponse = rateLimit(req);
    if (rateLimitResponse) return rateLimitResponse;

    // Check if route is protected
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
    if (!isProtected) {
        return NextResponse.next();
    }

    // Auth Middleware for Protected Routes
    const authResponse = await authMiddleware(req, allowedRoles);
    if (authResponse.status !== 200) {
        return authResponse;
    }

    const response = applySecurityHeaders(authResponse);
    return response
}

export const config = {
    matcher: [
        '/api/:path*',
        '/dashboard/:path*',
        '/bookings/:path*',
        '/support/:path*',
        '/partners/:path*',
    ],
};

