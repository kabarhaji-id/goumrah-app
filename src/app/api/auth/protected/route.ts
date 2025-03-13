import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/shared/middleware/authMiddleware";
import { Role } from "@/modules/auth/domain/role";

/**
 * Protected route yang hanya bisa diakses oleh user dengan role tertentu.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    const allowedRoles = [Role.ADMINISTRATOR, Role.CUSTOMER];
    const response = await authMiddleware(req, allowedRoles);

    if (response.status !== 200) return response;

    const user = JSON.parse(req.headers.get("user") || "{}");
    return NextResponse.json({ message: "Protected Route Accessed!", user });
}
