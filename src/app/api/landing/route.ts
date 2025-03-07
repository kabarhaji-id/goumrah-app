import { NextResponse } from "next/server";
import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import { dummyLandingData } from "@/modules/landing/infrastructure/landingDumyData";

// ✅ Fungsi handler yang menerima service sebagai parameter
export function createLandingHandler(service: LandingService) {
    return async function GET() {
        try {
            const response = await service.getLandingData();

            if (!response || !response.data || response.status !== 200) {
                console.warn("⚠️ Landing data is invalid or error occurred. Using dummy data.");
                return NextResponse.json(
                    { data: dummyLandingData, error: response?.error ?? "Service Error" },
                    { status: response?.status ?? 500 }
                );
            }

            return NextResponse.json(response, { status: response.status });
        } catch (error) {
            console.error("❌ Error fetching landing data:", error);
            return NextResponse.json(
                { data: dummyLandingData, error: "Internal Server Error" },
                { status: 500 }
            );
        }
    };
}

// ✅ Inisialisasi dengan instance default
const landingService = new LandingService(new LandingRepository());
export const GET = createLandingHandler(landingService);

// ✅ OPTIONS handler tetap sama
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
