import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";

jest.mock("@/modules/landing/infrastructure/LandingRepository");

describe("LandingService", () => {
    let landingRepositoryMock: jest.Mocked<LandingRepository>;
    let landingService: LandingService;

    beforeEach(() => {
        landingRepositoryMock = new LandingRepository() as jest.Mocked<LandingRepository>;
        landingService = new LandingService(landingRepositoryMock);
    });

    // ✅ Positive Case: Should return landing data when repository succeeds
    it("should return landing data when repository returns content", async () => {
        // 🛠️ Arrange
        const mockData = {
            title: "Mock Title",
            description: "Mock Description",
            features: ["Feature A", "Feature B"],
            imageUrl: "https://mockwebsite.com/mock-image.jpg", // ✅ Add missing property
        };
        landingRepositoryMock.getLandingContent.mockReturnValue(mockData);

        // 🎯 Act
        const result = await landingService.getLandingData();

        // ✅ Assert
        expect(result).toEqual(mockData);
        expect(landingRepositoryMock.getLandingContent).toHaveBeenCalledTimes(1);
    });

    // ❌ Negative Case: Should handle error when repository fails
    it("should throw an error when repository fails", async () => {
        // 🛠️ Arrange
        landingRepositoryMock.getLandingContent.mockImplementation(() => {
            throw new Error("Repository error");
        });

        // 🎯 Act & ✅ Assert
        await expect(landingService.getLandingData()).rejects.toThrow("Repository error");
        expect(landingRepositoryMock.getLandingContent).toHaveBeenCalledTimes(1);
    });
});
