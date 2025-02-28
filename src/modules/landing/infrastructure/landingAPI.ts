export class LandingAPI {
    private static API_URL = process.env.NEXT_PUBLIC_API_URL + "/landing";

    static async fetchLandingData() {
        try {
            console.log("🔄 Fetching from:", this.API_URL);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000); // ⏳ Timeout 5 detik

            const response = await fetch(this.API_URL, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                signal: controller.signal,
            });
            clearTimeout(timeout);

            console.log("📡 Response status:", response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("❌ Fetch error:", error);
            throw error;
        }
    }
}
