import { NextResponse } from "next/server";
import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import { dummyLandingData } from "@/modules/landing/infrastructure/landingDumyData";

// ✅ Initialize the service with the repository
const landingService = new LandingService(new LandingRepository());

/**
 * Handle GET request to fetch landing data.
 */
export async function GET() {
    try {
        const response = await landingService.getLandingData();

        if (!response || !response.data) {
            console.warn("⚠️ Landing data is empty. Using dummy data.");
            return NextResponse.json({ data: dummyLandingData, error: "Using fallback data" }, { status: 200 });
        }

        return NextResponse.json(response, { status: response.status });
    } catch (error) {
        console.error("❌ Error fetching landing data:", error);
        return NextResponse.json({ data: dummyLandingData, error: "Internal Server Error" }, { status: 500 });
    }
}

/**
 * Handle OPTIONS request for CORS preflight.
 */
export function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
