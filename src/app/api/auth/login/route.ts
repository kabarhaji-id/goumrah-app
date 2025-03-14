import { authHandler } from "@/modules/auth/infrastructure/handler/HandlerAuth";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";


export async function POST(req: NextRequest) {
    return await authHandler.login(req);
}