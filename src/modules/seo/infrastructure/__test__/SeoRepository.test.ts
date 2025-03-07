import { SeoRepository } from "../SeoRepository";
import { fallbackSeoData } from "@/modules/seo/constants/fallbackSeo";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";

// Mock global fetch API
global.fetch = jest.fn();

describe("SeoRepository", () => {
    let seoRepository: SeoRepository;

    beforeEach(() => {
        jest.clearAllMocks(); // Reset semua mock sebelum setiap tes
        seoRepository = new SeoRepository();
    });

    test("✅ Fetch SEO data successfully (Positive Case)", async () => {
        // 🔹 Arrange: Setup mock API response
        const mockSeoData: SEOConfig = {
            title: "Mock Title",
            titleTemplate: "%s | Goumrah",
            defaultTitle: "Mock Default Title",
            description: "Mock Description",
            openGraph: {
                type: "website",
                locale: "en_US",
                url: "https://mock-url.com",
                site_name: "Mock Site",
                title: "Mock OG Title",
                description: "Mock OG Description",
                images: [{ url: "https://mock-url.com/image.jpg", width: 1200, height: 630, alt: "Mock Image" }],
            },
            twitter: {
                cardType: "summary_large_image",
                site: "@mock",
                creator: "@mock",
                title: "Mock Twitter Title",
                description: "Mock Twitter Description",
                image: "https://mock-url.com/twitter-image.jpg",
            },
            additionalMetaTags: [{ name: "robots", content: "index, follow" }],
        };

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockSeoData),
        });

        // 🔹 Act: Panggil fungsi fetchSeoData
        const result = await seoRepository.fetchSeoData("/");

        // 🔹 Assert: Periksa apakah data API sesuai
        expect(result).toEqual(mockSeoData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining(encodeURIComponent("/")),
            expect.objectContaining({ method: "GET" })
        );
    });

    test("❌ API fails and returns fallback SEO data (Negative Case)", async () => {
        // 🔹 Arrange: Simulasi respons API gagal
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
        });

        // 🔹 Act: Panggil fungsi fetchSeoData
        const result = await seoRepository.fetchSeoData("/");

        // 🔹 Assert: Harus mendapatkan fallback data
        expect(result).toEqual(fallbackSeoData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining(encodeURIComponent("/")),
            expect.objectContaining({ method: "GET" })
        );
    });

    test("❌ Fetch throws an error and returns fallback SEO data (Negative Case)", async () => {
        // 🔹 Arrange: Simulasi fetch mengalami error jaringan
        (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

        // 🔹 Act: Panggil fungsi fetchSeoData
        const result = await seoRepository.fetchSeoData("/");

        // 🔹 Assert: Harus mendapatkan fallback data
        expect(result).toEqual(fallbackSeoData);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
