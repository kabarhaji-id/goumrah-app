import { NextResponse } from "next/server";
import { fallbackFooterData } from "@/shared/data/fallbackFooterData";
import { FooterData } from "@/shared/types/FooterTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.goumroh.id";

/**
 * Handles GET requests for the footer API.
 * Returns API data or fallback data if the API fails.
 */
export async function GET() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/footer`);

        if (!response.ok) {
            console.warn("⚠️ API failed. Returning fallback data.");
            return NextResponse.json(
                { data: fallbackFooterData, error: "Using fallback data" },
                { status: 200 }
            );
        }

        const jsonData: { data: FooterData } = await response.json(); // Explicitly define response shape
        return NextResponse.json(jsonData, { status: 200 });

    } catch (error) {
        console.error("❌ Error fetching footer data:", error);
        return NextResponse.json(
            { data: fallbackFooterData, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
