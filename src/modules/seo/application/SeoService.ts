import { SeoRepository } from "@/modules/seo/infrastructure/SeoRepository";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";

export class SeoService {
    private seoRepository: SeoRepository;

    constructor(seoRepository: SeoRepository) {
        this.seoRepository = seoRepository;
    }

    // Fetch SEO data for the page based on `slug` (or any other identifier)
    async getSeoData(slug: string): Promise<SEOConfig | null> {
        try {
            // Replace this with your actual API or repository call
            return await this.seoRepository.getSeoConfigForPage(slug);
        } catch (error) {
            console.error("Error fetching SEO data:", error);
            return null;
        }
    }

    // Fallback SEO data if no dynamic data is found
    async getFallbackSeoData(): Promise<SEOConfig> {
        return {
            title: 'Default Title',
            titleTemplate: '%s | Dynamic Website',
            defaultTitle: 'Dynamic Website',
            description: 'This is the default description.',
            openGraph: {
                type: 'website',
                locale: 'en_US',
                url: 'https://defaultwebsite.com',
                site_name: 'Default Website',
                title: 'Default OG Title',
                description: 'Default OG Description',
                images: [
                    {
                        url: 'https://defaultwebsite.com/image.jpg',
                        width: 1200,
                        height: 630,
                        alt: 'Default Image',
                    },
                ],
            },
            twitter: {
                cardType: 'summary_large_image',
                site: '@defaultwebsite',
                creator: '@defaultwebsite',
                title: 'Default Twitter Title',
                description: 'Default Twitter Description',
                image: 'https://defaultwebsite.com/image.jpg',
            },
            additionalMetaTags: [
                { name: 'theme-color', content: '#000000' },
                { name: 'msapplication-navbutton-color', content: '#000000' },
                { name: 'apple-mobile-web-app-status-bar-style', content: '#000000' },
            ],
        };
    }
}
