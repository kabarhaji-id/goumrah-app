import { LandingRepository } from "@/modules/landing/infrastructure/landingRepository";

export class LandingService {
    private repository: LandingRepository;

    constructor(repository: LandingRepository) {
        this.repository = repository;
    }

    async getLandingData() {
        try {
            const response = await this.repository.getLandingContent();

            // Jika sukses (status 200), kembalikan hanya `data` dan `status`
            if (response.status === 200) {
                return { data: response.data, status: response.status };
            }

            // Jika gagal, pastikan `error` tetap ada
            return { data: null, error: response.error ?? "Unknown Error", status: response.status };
        } catch (error) {
            return { data: null, error: "Internal Server Error", status: 500 };
        }
    }
}
