import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/shared/middleware/authMiddleware";
import { roleMiddleware } from "@/shared/middleware/roleMiddleware";
import { applyCORS } from "@/shared/middleware/corsMiddleware";
import {Role} from "@/modules/auth/domain/role";

const protectedRoutes = ["/dashboard", "/bookings", "/support", "/partners"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Jika route tidak termasuk dalam protectedRoutes, lanjutkan request
    if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Role yang diperbolehkan mengakses route ini
    const allowedRoles = [
        Role.ADMINISTRATOR,
        Role.CUSTOMER,
        Role.PARTNER,
        Role.CUSTOMER_SUPPORT,
    ];

    // Middleware Auth untuk validasi token
    const authResponse = await authMiddleware(req, allowedRoles);

    if (authResponse.status !== 200) {
        return authResponse;
    }

    // Apply CORS dan roleMiddleware
    return applyCORS(roleMiddleware(req));
}

export const config = {
    matcher: "/:path*",
};
