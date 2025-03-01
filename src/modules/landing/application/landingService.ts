import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";
import {dummyLandingData} from "@/modules/landing/infrastructure/landingDumyData";

export class LandingService {
    private repository: LandingRepository;

    constructor(repository: LandingRepository) {
        this.repository = repository;
    }

    async getLandingData() {
        try {
            const response = await this.repository.getLandingContent();

            if (response.status === 200) {
                return { data: response.data, status: 200 };
            }

            console.warn("⚠️ Landing repository returned an error. Using fallback data.");
            return { data: response.data, error: response.error ?? "Unknown Error", status: response.status };
        } catch (error) {
            console.error("❌ Unexpected error in LandingService. Returning dummy data.");
            return { data: dummyLandingData, error: "Internal Server Error", status: 500 };
        }
    }
}
