import { LandingContent } from "@/modules/landing/domain/landingModel";
import { dummyLandingData } from "@/modules/landing/infrastructure/landingDumyData";

export class LandingRepository {
    async getLandingContent(): Promise<{ data: LandingContent | null; error?: string; status: number }> {
        try {
            console.log("🔄 Fetching landing content from internal repository...");

            // ✅ Directly return dummy data instead of fetching an API
            return { data: dummyLandingData, status: 200 };

        } catch (error) {
            console.error("❌ Failed to fetch landing content. Returning fallback data.", error);
            return { data: dummyLandingData, error: "Internal repository error", status: 500 };
        }
    }
}
