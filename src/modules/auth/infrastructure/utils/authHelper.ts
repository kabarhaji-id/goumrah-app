import { NextRequest, NextResponse } from "next/server";
import { verifyJWTToken } from "@/modules/auth/infrastructure/utils/sessionUtils";
import { Role } from "@/modules/auth/domain/role";
import { Users } from "@/modules/auth/domain/users";
import { TokenPayload } from "@/modules/auth/domain/authEntity";

// 1. Extract token from request
export function extractToken(req: NextRequest): string | null {
    const token: string | null = req.cookies.get("token")?.value ||
        req.headers.get("Authorization")?.replace("Bearer ", "") || null;

    console.log("🔍 [AuthHelper] Extracted Token:", token);
    return token;
}

// 2. Verify JWT Token
export async function verifyToken(token: string): Promise<TokenPayload | null> {
    console.log("🔑 [AuthHelper] Verifying token...");
    return await verifyJWTToken(token);
}

// 3. Get user from database
export async function getUserFromDB(userId: number, token: string): Promise<Users | null> {
    console.log(`🔍 [AuthHelper] Fetching user with ID: ${userId}`);

    const response = await fetch(`http://localhost:3000/api/auth/${userId}`);

    if (!response.ok) {
        console.error("❌ [AuthHelper] Error fetching user:", await response.json());
        return null;
    }

    const jsonResponse = await response.json();
    console.log("✅ [AuthHelper] Json fetched:", jsonResponse);
    const userInDB: Users = jsonResponse.data;

    console.log("✅ [AuthHelper] User fetched:", userInDB);

    if (userInDB.token !== token) {
        console.log("❌ [AuthHelper] Token mismatch.");
        return null;
    }

    return userInDB;
}

// 4. Check if user has valid role
export function validateRole(userInDB: Users, allowedRoles: Role[]): boolean {
    const isValid = allowedRoles.includes(userInDB.role as Role);
    console.log("✅ [AuthHelper] Role validation result:", isValid);
    return isValid;
}

// 5. Inject user into request headers
export function injectUserIntoRequest(req: NextRequest, userInDB: Users): NextResponse {
    console.log("🚀 [AuthHelper] Injecting user into request...");

    const response = NextResponse.next();

    // Inject user ke cookies
    response.cookies.set("token", JSON.stringify(userInDB), {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    // Inject user ke request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("token", JSON.stringify(userInDB));

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
