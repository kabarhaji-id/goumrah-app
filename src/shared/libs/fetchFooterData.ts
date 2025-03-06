import { fallbackFooterData } from "@/shared/data/fallbackFooterData";
import { FooterData } from "@/shared/types/FooterTypes";

/**
 * Fetches footer data from the Next.js API route.
 * Returns fallback data if the request fails.
 *
 * @returns {Promise<FooterData>} The fetched or fallback footer data.
 */
export const fetchFooterData = async (): Promise<FooterData> => {
    try {
        const response = await fetch("/api/footer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.warn("⚠️ API request failed. Using fallback footer data.");
            return fallbackFooterData; // Return fallback data instead of throwing an error
        }

        const { data }: { data: FooterData } = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error fetching footer data:", error);
        return fallbackFooterData; // Return fallback data on error
    }
};
