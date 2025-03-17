import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/shared/libs/responseUtils";
import { extractToken, verifyToken, getUserFromDB, validateRole, injectUserIntoRequest } from "@/modules/auth/infrastructure/utils/authHelper";
import { TokenPayload } from "@/modules/auth/domain/authEntity";
import { Users } from "@/modules/auth/domain/users";
import { Role } from "@/modules/auth/domain/role"; // ✅ Import Role di sini

export async function authMiddleware(req: NextRequest, allowedRoles: Role[]): Promise<NextResponse> {
    try {
        const token = extractToken(req);
        if (!token) {
            return errorResponse(401, "Unauthorized: Token not provided.");
        }

        const decodedUser: TokenPayload | null = await verifyToken(token);

        if (!decodedUser) {
            return errorResponse(403, "Unauthorized: Invalid Token.");
        }

        const userInDB: Users | null = await getUserFromDB(decodedUser.userId, token);
        if (!userInDB) {
            return errorResponse(403, "Unauthorized: Token has expired.");
        }

        const hasValidRole: boolean = validateRole(userInDB, allowedRoles);
        if (!hasValidRole) {
            return errorResponse(403, "Forbidden: Insufficient Role.");
        }

        return injectUserIntoRequest(req, userInDB);
    } catch (error) {
        console.error("❌ Error in authMiddleware:", error);
        return errorResponse(500, "Internal Server Error.");
    }
}
