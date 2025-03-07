import { SEOConfig } from "@/modules/seo/domain/SeoModel";
import { fallbackSeoData } from "@/modules/seo/constants/fallbackSeo";

export class SeoRepository {
    private apiUrl: string;

    constructor() {
        this.apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        if (!this.apiUrl) {
            console.warn("⚠️ NEXT_PUBLIC_API_URL tidak ditemukan. Menggunakan fallback data.");
        }
    }

    async fetchSeoData(path: string): Promise<SEOConfig> {
        try {
            const response = await fetch(`${this.apiUrl}/seo?path=${encodeURIComponent(path)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.warn(`⚠️ Failed to fetch SEO data: ${response.status} - ${response.statusText}. Menggunakan fallback.`);
                return this.getFallbackSeoData();
            }

            return await response.json();
        } catch (error) {
            console.error("🚨 Error fetching SEO data:", error);
            return this.getFallbackSeoData();
        }
    }

    private getFallbackSeoData(): SEOConfig {
        return fallbackSeoData;
    }
}
