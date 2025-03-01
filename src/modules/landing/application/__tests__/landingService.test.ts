import { LandingService } from "@/modules/landing/application/landingService";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import { dummyLandingData } from "@/modules/landing/infrastructure/landingDumyData";

jest.mock("@/modules/landing/infrastructure/landingRepository");

describe("LandingService", () => {
    let landingService: LandingService;
    let landingRepositoryMock: jest.Mocked<LandingRepository>;

    beforeEach(() => {
        landingRepositoryMock = new LandingRepository() as jest.Mocked<LandingRepository>;
        landingService = new LandingService(landingRepositoryMock);
        jest.clearAllMocks();
    });

    it("✅ should return landing data from repository with real data", async () => {
        const mockData = {
            data: dummyLandingData,
            status: 200,
        };

        landingRepositoryMock.getLandingContent.mockResolvedValue(mockData);

        const result = await landingService.getLandingData();

        expect(result).toEqual(mockData);
        expect(landingRepositoryMock.getLandingContent).toHaveBeenCalledTimes(1);
    });

    it("⚠️ should return standardized error response if repository fails with code 500", async () => {
        const mockErrorResponse = {
            data: dummyLandingData,
            error: "Internal Server Error",
            status: 500,
        };

        landingRepositoryMock.getLandingContent.mockRejectedValue(new Error("Failed to fetch"));

        const result = await landingService.getLandingData();

        expect(result).toEqual(mockErrorResponse);
        expect(landingRepositoryMock.getLandingContent).toHaveBeenCalledTimes(1);
    });

    it("⚠️ should return internal server error if an unexpected error occurs", async () => {
        landingRepositoryMock.getLandingContent.mockRejectedValue(new Error("Unexpected Error"));

        const result = await landingService.getLandingData();

        console.log("Actual result:", JSON.stringify(result, null, 2)); // ✅ Debugging output

        expect(result).toEqual({
            data: dummyLandingData,
            error: "Internal Server Error",
            status: 500,
        });

        expect(landingRepositoryMock.getLandingContent).toHaveBeenCalledTimes(1);
    });

});
