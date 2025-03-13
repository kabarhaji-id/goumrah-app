import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/shared/libs/responseUtils";
import {Role} from "@/modules/auth/domain/role";


const protectedRoutes: Record<string, Role[]> = {
    "/dashboard": [Role.ADMINISTRATOR, Role.TRAVEL_AGENT],
    "/bookings": [Role.CUSTOMER, Role.TRAVEL_AGENT],
    "/support": [Role.CUSTOMER_SUPPORT],
    "/partners": [Role.PARTNER, Role.ADMINISTRATOR],
};

export function roleMiddleware(req: NextRequest): NextResponse {
    const userString = req.headers.get("user");

    if (!userString) {
        return errorResponse(401, "Unauthorized: No User Found.");
    }

    const user = JSON.parse(userString);

    const { pathname } = req.nextUrl;
    const allowedRoles = protectedRoutes[pathname] || [];

    if (!allowedRoles.includes(user.role)) {
        return errorResponse(403, "Forbidden: Insufficient Role.");
    }

    return NextResponse.next();
}
