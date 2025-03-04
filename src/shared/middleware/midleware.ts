import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { Role } from "@/modules/auth/domain/role"; // Ensure enum Role exists

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const role = (req.nextauth.token?.role as Role) ?? Role.REGISTERED_USER; // Default to REGISTERED_USER

        // Validate if role exists in our Role enum
        if (!Object.values(Role).includes(role)) {
            return NextResponse.redirect(new URL("/auth", req.url));
        }

        // Protected Routes with Role-Based Access
        const protectedRoutes: Record<string, Role[]> = {
            "/dashboard": [Role.ADMINISTRATOR, Role.TRAVEL_AGENT],
            "/bookings": [Role.CUSTOMER, Role.TRAVEL_AGENT],
            "/support": [Role.CUSTOMER_SUPPORT],
            "/partners": [Role.PARTNER, Role.ADMINISTRATOR],
        };

        for (const route in protectedRoutes) {
            if (pathname.startsWith(route) && !protectedRoutes[route].includes(role)) {
                return NextResponse.redirect(new URL("/unauthorized", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Allow only if token exists
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/bookings/:path*", "/support/:path*", "/partners/:path*"],
};
