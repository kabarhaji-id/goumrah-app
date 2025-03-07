import { SeoRepository } from "@/modules/seo/infrastructure/SeoRepository";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";
import { fallbackSeoData } from "@/modules/seo/constants/fallbackSeo";

export class SeoService {
    private seoRepository: SeoRepository;

    constructor(seoRepository: SeoRepository) {
        this.seoRepository = seoRepository;
    }

    /**
     * Mengambil data SEO berdasarkan path halaman.
     * Jika API gagal, akan mengembalikan fallback SEO.
     */
    async getSeoData(path: string): Promise<SEOConfig> {
        const seoData = await this.seoRepository.fetchSeoData(path);
        return seoData ?? fallbackSeoData; // Jika gagal, gunakan fallback
    }
}
