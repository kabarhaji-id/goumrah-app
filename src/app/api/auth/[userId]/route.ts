import { NextRequest } from "next/server";
import { authRemoteServices } from "@/modules/auth/application/AuthRemoteService";
import { errorResponse } from "@/shared/libs/responseUtils";

export async function GET(
    _: NextRequest,
    { params }: { params: { userId: string } } // ✅ Fixed the type here
) {
    const { userId } = params; // ✅ No need to await params here
    console.log("API PARAMS:", userId);

    const id = Number(userId);
    if (isNaN(id)) {
        return errorResponse(400, "Invalid user ID");
    }

    return await authRemoteServices.getUserById(id);
}
