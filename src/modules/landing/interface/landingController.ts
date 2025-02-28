import { NextResponse } from "next/server";
import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";

const landingRepository = new LandingRepository();
const landingService = new LandingService(landingRepository);

export async function GET() {
    try {
        const { data, error, status } = await landingService.getLandingData();

        return NextResponse.json(
            { success: error ? false : true, data, error },
            { status }
        );
    } catch (error) {
        console.error("❌ Error fetching landing data:", error);

        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
