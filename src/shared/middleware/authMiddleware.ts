import { NextRequest, NextResponse } from "next/server";
import { verifyJWTToken } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { UsersRepository } from "@/modules/auth/infrastructure/usersRepository";
import { errorResponse } from "@/shared/libs/responseUtils";
import { Role } from "@/modules/auth/domain/role";

const usersRepository = new UsersRepository();

/**
 * Middleware untuk otorisasi pengguna berdasarkan role.
 */
export async function authMiddleware(
    req: NextRequest,
    allowedRoles: Role[]
): Promise<NextResponse> {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return errorResponse(401, "Unauthorized: Token not provided.");
    }

    const user = verifyJWTToken(token);
    if (!user) {
        return errorResponse(403, "Invalid or Expired Token.");
    }

    const identifier = user?.email || user?.phone || user?.username;

    if (!identifier) {
        return errorResponse(401, "Unauthorized: Invalid Token.");
    }

    let field: "email" | "phone" | "username";
    if (user.email) field = "email";
    else if (user.phone) field = "phone";
    else field = "username";

    const userInDB = await usersRepository.getUsersByField(field, identifier);

    if (!userInDB || !userInDB.token) {
        return errorResponse(403, "Invalid or Expired Token.");
    }

    if (userInDB.token !== token) {
        return errorResponse(403, "Invalid Token.");
    }

    if (!allowedRoles.includes(userInDB.role as Role)) {
        return errorResponse(403, "Forbidden: Insufficient Role.");
    }

    req.headers.set("user", JSON.stringify(user));
    return NextResponse.next();
}
