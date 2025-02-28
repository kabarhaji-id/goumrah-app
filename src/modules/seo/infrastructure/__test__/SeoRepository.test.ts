import { SeoRepository } from "@/modules/seo/infrastructure/SeoRepository";
import seoConfig from "@/modules/seo/config/next-seo.config";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";

describe("SeoRepository", () => {
    let seoRepository: SeoRepository;

    beforeEach(() => {
        seoRepository = new SeoRepository();
    });

    // ✅ Positive Case: Should return SEO configuration
    it("should return the correct SEO configuration", () => {
        // 🛠️ Arrange
        const expectedConfig: SEOConfig = seoConfig;

        // 🎯 Act
        const result = seoRepository.getSeoConfig();

        // ✅ Assert
        expect(result).toEqual(expectedConfig);
    });

    // ❌ Negative Case: Should return empty object if seoConfig is null
    it("should return an empty object when seoConfig is null", () => {
        // 🛠️ Arrange
        jest.spyOn(seoRepository, "getSeoConfig").mockReturnValue(null as unknown as SEOConfig);

        // 🎯 Act
        const result = seoRepository.getSeoConfig();

        // ✅ Assert
        expect(result).toBeNull();
    });

    // ❌ Negative Case: Should throw an error if accessing config fails
    it("should throw an error when repository fails to fetch data", () => {
        // 🛠️ Arrange
        jest.spyOn(seoRepository, "getSeoConfig").mockImplementation(() => {
            throw new Error("Repository error");
        });

        // 🎯 Act & ✅ Assert
        expect(() => seoRepository.getSeoConfig()).toThrow("Repository error");
    });
});
