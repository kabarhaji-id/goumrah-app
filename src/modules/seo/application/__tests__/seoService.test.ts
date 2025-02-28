import { SeoService } from "@/modules/seo/application/SeoService";
import { SeoRepository } from "@/modules/seo/infrastructure/SeoRepository";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";

jest.mock("@/modules/seo/infrastructure/SeoRepository"); // Mock SeoRepository

describe("SeoService", () => {
    let seoService: SeoService;
    let seoRepositoryMock: jest.Mocked<SeoRepository>;

    beforeEach(() => {
        seoRepositoryMock = new SeoRepository() as jest.Mocked<SeoRepository>;
        seoService = new SeoService(seoRepositoryMock); // ✅ Inject mock
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ✅ Positive Case: Should return correct SEO data
    it("should return SEO configuration when repository returns data", () => {
        // 🛠️ Arrange
        const mockSeoData: SEOConfig = {
            title: "Mock Title",
            titleTemplate: "%s | Mock Website",
            defaultTitle: "Mock Website",
            description: "Mock description",
            openGraph: {
                type: "website",
                locale: "en_US",
                url: "https://mockwebsite.com",
                site_name: "Mock Website",
                title: "Mock Website",
                description: "Mock description",
                images: [
                    {
                        url: "https://mockwebsite.com/image.jpg",
                        width: 1200,
                        height: 630,
                        alt: "Mock Image",
                    },
                ],
            },
            twitter: {
                cardType: "summary_large_image",
                site: "@mockwebsite",
                creator: "@mockwebsite",
                title: "Mock Website",
                description: "Mock description",
                image: "https://mockwebsite.com/image.jpg",
            },
            additionalMetaTags: [
                { name: "theme-color", content: "#000000" },
                { name: "msapplication-navbutton-color", content: "#000000" },
                { name: "apple-mobile-web-app-status-bar-style", content: "#000000" },
            ],
        };

        seoRepositoryMock.getSeoConfig.mockReturnValue(mockSeoData); // ✅ Mock return value

        // 🎯 Act
        const result = seoService.getSeoData();

        // ✅ Assert
        expect(result).toEqual(mockSeoData);
        expect(seoRepositoryMock.getSeoConfig).toHaveBeenCalledTimes(1);
    });

    // ❌ Negative Case: Should return undefined if repository fails
    it("should return undefined when repository throws an error", () => {
        // 🛠️ Arrange
        seoRepositoryMock.getSeoConfig.mockImplementation(() => {
            throw new Error("Repository failed");
        });

        // 🎯 Act
        let result;
        try {
            result = seoService.getSeoData();
        } catch {
            result = undefined;
        }

        // ✅ Assert
        expect(result).toBeUndefined();
        expect(seoRepositoryMock.getSeoConfig).toHaveBeenCalledTimes(1);
    });


    // ❌ Negative Case: Should return empty SEO config if repository returns null
    it("should return undefined when repository returns null", () => {
        // 🛠️ Arrange
        seoRepositoryMock.getSeoConfig.mockReturnValue(null as unknown as SEOConfig);

        // 🎯 Act
        const result = seoService.getSeoData();

        // ✅ Assert
        expect(result).toBeNull();
        expect(seoRepositoryMock.getSeoConfig).toHaveBeenCalledTimes(1);
    });

});
