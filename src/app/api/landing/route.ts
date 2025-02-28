import { NextResponse } from "next/server";
import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";

const landingRepository = new LandingRepository();
const landingService = new LandingService(landingRepository);

export async function GET() {
    try {
        console.log("✅ API /api/landing dipanggil...");
        const data = await landingService.getLandingData();
        console.log("✅ Data berhasil diambil:", data);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching landing data:", error);

        return NextResponse.json(
            { error: "Failed to fetch landing data" },
            { status: 500 }
        );
    }
}
