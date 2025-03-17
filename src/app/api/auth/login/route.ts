import { NextRequest } from "next/server";
import {authRemoteServices} from "@/modules/auth/application/AuthRemoteService"


export async function POST(req: NextRequest) {
    return await authRemoteServices.login(req);
}