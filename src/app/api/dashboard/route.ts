import { NextRequest, NextResponse } from "next/server";
import {AuthUser} from "@/modules/auth/domain/users";

export async function GET(req: NextRequest) {
    const user: AuthUser = JSON.parse(req.headers.get("user") || "{}");
    return NextResponse.json({
        message: "✅ User Authenticated",
        user,
    });
}
