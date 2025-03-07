import { SeoService } from "@/modules/seo/application/SeoService";
import { SeoRepository } from "@/modules/seo/infrastructure/SeoRepository";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";
import { fallbackSeoData } from "@/modules/seo/constants/fallbackSeo";

jest.mock("@/modules/seo/infrastructure/SeoRepository");

describe("SeoService", () => {
    let seoService: SeoService;
    let seoRepository: jest.Mocked<SeoRepository>;

    const mockSeoData: SEOConfig = {
        title: "Mock Title",
        titleTemplate: "%s | Mock Site",
        defaultTitle: "Mock Default Title",
        description: "Mock Description",
        openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://mock-url.com",
            site_name: "Mock Site",
            title: "Mock OpenGraph Title", // ✅ Diperbaiki
            description: "Mock OpenGraph Description", // ✅ Diperbaiki
            images: [ // ✅ Diperbaiki
                {
                    url: "https://mock-url.com/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Mock OG Image",
                },
            ],
        },
        twitter: {
            cardType: "summary_large_image",
            site: "@mock",
            creator: "@mock",
            title: "Mock Twitter Title", // ✅ Diperbaiki
            description: "Mock Twitter Description", // ✅ Diperbaiki
            image: "https://mock-url.com/twitter-image.jpg", // ✅ Diperbaiki
        },
        additionalMetaTags: [
            { name: "robots", content: "index, follow" },
        ],
    };


    beforeEach(() => {
        seoRepository = new SeoRepository() as jest.Mocked<SeoRepository>;
        seoService = new SeoService(seoRepository);
        jest.clearAllMocks();
    });

    it("should return SEO data from repository (Positive Case)", async () => {
        seoRepository.fetchSeoData.mockResolvedValue(mockSeoData);

        const result = await seoService.getSeoData("/mock-path");

        expect(seoRepository.fetchSeoData).toHaveBeenCalledWith("/mock-path");
        expect(result).toEqual(mockSeoData);
    });

    it("should return fallback SEO data if repository fails (Negative Case)", async () => {
        (seoRepository.fetchSeoData as jest.Mock).mockResolvedValue(null);

        const result = await seoService.getSeoData("/mock-path");

        expect(seoRepository.fetchSeoData).toHaveBeenCalledWith("/mock-path");
        expect(result).toEqual(fallbackSeoData);
    });
});
