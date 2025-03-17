import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/shared/libs/responseUtils";
import { verifyJWTToken } from "@/modules/auth/infrastructure/utils/sessionUtils";

// Ensure to properly destructure the params in the function signature
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    console.log("🔍 Incoming request:", req);
    console.log("🛂 Params received:", params);

    const token = req.cookies.get("token")?.value;

    if (!token) {
        console.warn("⚠️ Token is not available");
        return errorResponse(401, "Token not Available");
    }

    console.log("🔑 Token retrieved from cookies:", token);

    try {
        // Decoding the token
        const users = await verifyJWTToken(token);

        console.log("✅ Decoded Token:", users);

        // Log detailed information about 'users'
        if (!users) {
            console.error("❌ Decoding failed: No user data returned");
            return errorResponse(401, "Invalid Token or No User Data");
        }

        // Log the content of the decoded user data
        console.log("👤 Decoded User Data:", users);

        // Use the userId param from the URL params (params.userId)
        console.log("👤 User ID from params:", params.userId);

        return successResponse(200, users);

    } catch (error) {
        console.error("❌ Error decoding token:", error);
        return errorResponse(401, "Invalid Token");
    }
}
