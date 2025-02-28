import { NextResponse } from "next/server";
import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";

// Inisialisasi LandingService dengan Repository
const landingService = new LandingService(new LandingRepository());

/**
 * Handle GET request to fetch landing data.
 */
export async function GET() {
    try {
        const data = await landingService.getLandingData();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ data: null, error: errorMessage }, { status: 500 });
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
