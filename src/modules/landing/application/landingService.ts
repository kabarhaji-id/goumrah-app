import { LandingContent } from "@/modules/landing/domain/landingModel";
import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";

export class LandingService {
    private landingRepository: LandingRepository;

    constructor(landingRepository: LandingRepository) {
        this.landingRepository = landingRepository;
    }

    async getLandingData(): Promise<LandingContent> {
        console.log("🔍 Memanggil repository untuk mendapatkan data landing...");
        const data = await this.landingRepository.getLandingContent();
        console.log("✅ Data berhasil diperoleh dari repository:", data);
        return data;
    }
}
