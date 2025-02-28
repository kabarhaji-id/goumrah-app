import { LandingContent } from "@/modules/landing/domain/landingModel";
import { dummyLandingData } from "@/modules/landing/infrastructure/landingDumyData";

export class LandingRepository {
    private API_URL = "https://your-api.com/landing"; // 🔄 Ganti dengan API backend asli

    async getLandingContent(): Promise<{ data: LandingContent | null; error?: string; status: number }> {
        try {
            console.log("🔄 Fetching from:", this.API_URL);
            const response = await fetch(this.API_URL);
            console.log("📡 Response status:", response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("✅ Data dari API:", data);
            return { data, status: 200 }; // ✅ Sesuai dengan tipe yang diharapkan
        } catch (error) {
            console.error("⚠️ Fetch error, menggunakan dummy data:", error);
            return { data: dummyLandingData, error: "Failed to fetch landing data", status: 500 }; // ✅ Tambahkan error message
        }
    }
}
