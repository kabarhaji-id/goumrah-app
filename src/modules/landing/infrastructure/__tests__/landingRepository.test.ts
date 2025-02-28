import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import { LandingContent } from "@/modules/landing/domain/landingModel";

describe("LandingRepository", () => {
    let landingRepository: LandingRepository;

    beforeEach(() => {
        // Arrange: Initialize LandingRepository before each test
        landingRepository = new LandingRepository();
    });

    describe("Positive Cases", () => {
        it("should return the correct landing content", () => {
            // Act: Call the method
            const result: LandingContent = landingRepository.getLandingContent();

            // Assert: Verify the returned data
            expect(result).toEqual({
                title: "Welcome to Our Platform",
                description: "Experience the best services with our cutting-edge technology.",
                imageUrl: "/images/hero.jpg",
            });
        });

        it("should return an object with valid properties", () => {
            // Act
            const result: LandingContent = landingRepository.getLandingContent();

            // Assert: Ensure properties exist and are of the correct type
            expect(result).toHaveProperty("title", expect.any(String));
            expect(result).toHaveProperty("description", expect.any(String));
            expect(result).toHaveProperty("imageUrl", expect.any(String));
        });
    });

    describe("Negative Cases", () => {
        it("should return an object with non-empty values", () => {
            // Act
            const result: LandingContent = landingRepository.getLandingContent();

            // Assert: Ensure that values are not empty strings
            expect(result.title).not.toBe("");
            expect(result.description).not.toBe("");
            expect(result.imageUrl).not.toBe("");
        });

        it("should not return null or undefined", () => {
            // Act
            const result: LandingContent = landingRepository.getLandingContent();

            // Assert
            expect(result).not.toBeNull();
            expect(result).not.toBeUndefined();
        });

        it("should not return unexpected values", () => {
            // Act
            const result: LandingContent = landingRepository.getLandingContent();

            // Assert: Ensure it does not contain any unexpected properties
            expect(result).not.toHaveProperty("invalidProperty");
        });
    });
});
