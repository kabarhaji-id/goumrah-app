import { SEOConfig } from "@/modules/seo/domain/SeoModel";

// Simulating SEO data fetching from a repository (or API)
export class SeoRepository {
    async getSeoConfigForPage(slug: string): Promise<SEOConfig | null> {
        // Simulate fetching dynamic SEO data based on the slug
        if (slug === "page-1") {
            return {
                title: "Dynamic Title for Page 1",
                titleTemplate: "%s | Dynamic Website",
                defaultTitle: "Dynamic Website",
                description: "This is the description for Page 1.",
                openGraph: {
                    type: "website",
                    locale: "en_US",
                    url: "https://dynamicwebsite.com/page-1",
                    site_name: "Dynamic Website",
                    title: "OG Title for Page 1",
                    description: "OG Description for Page 1",
                    images: [
                        {
                            url: "https://dynamicwebsite.com/page-1/image.jpg",
                            width: 1200,
                            height: 630,
                            alt: "Image for Page 1",
                        },
                    ],
                },
                twitter: {
                    cardType: "summary_large_image",
                    site: "@dynamicwebsite",
                    creator: "@dynamicwebsite",
                    title: "Twitter Title for Page 1",
                    description: "Twitter Description for Page 1",
                    image: "https://dynamicwebsite.com/page-1/twitter-image.jpg",
                },
                additionalMetaTags: [
                    { name: "theme-color", content: "#000000" },
                    { name: "msapplication-navbutton-color", content: "#000000" },
                    { name: "apple-mobile-web-app-status-bar-style", content: "#000000" },
                ],
            };
        } else if (slug === "page-2") {
            return {
                title: "Dynamic Title for Page 2",
                titleTemplate: "%s | Dynamic Website",
                defaultTitle: "Dynamic Website",
                description: "This is the description for Page 2.",
                openGraph: {
                    type: "website",
                    locale: "en_US",
                    url: "https://dynamicwebsite.com/page-2",
                    site_name: "Dynamic Website",
                    title: "OG Title for Page 2",
                    description: "OG Description for Page 2",
                    images: [
                        {
                            url: "https://dynamicwebsite.com/page-2/image.jpg",
                            width: 1200,
                            height: 630,
                            alt: "Image for Page 2",
                        },
                    ],
                },
                twitter: {
                    cardType: "summary_large_image",
                    site: "@dynamicwebsite",
                    creator: "@dynamicwebsite",
                    title: "Twitter Title for Page 2",
                    description: "Twitter Description for Page 2",
                    image: "https://dynamicwebsite.com/page-2/twitter-image.jpg",
                },
                additionalMetaTags: [
                    { name: "theme-color", content: "#000000" },
                    { name: "msapplication-navbutton-color", content: "#000000" },
                    { name: "apple-mobile-web-app-status-bar-style", content: "#000000" },
                ],
            };
        }

        // Return null if slug doesn't match
        return null;
    }
}
