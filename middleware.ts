import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/shared/middleware/authMiddleware";
import { applyCORS } from "@/shared/middleware/corsMiddleware";
import { Role } from "@/modules/auth/domain/role";

const protectedRoutes = ["/dashboard", "/bookings", "/support", "/partners"];
const excludedRoutes = ["/api/auth/login"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (excludedRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    const allowedRoles = [
        Role.ADMINISTRATOR,
        Role.CUSTOMER,
        Role.PARTNER,
        Role.CUSTOMER_SUPPORT,
    ];

    const authResponse = await authMiddleware(req, allowedRoles);

    if (authResponse.status !== 200) {
        return authResponse;
    }

    return applyCORS(authResponse);
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
