import {NextRequest} from "next/server";
import {authRemoteServices} from "@/modules/auth/application/AuthRemoteService";

export async function GET(req: NextRequest) {
    return authRemoteServices.getAuthUser(req);
}
