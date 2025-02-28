import { SEOConfig } from "@/modules/seo/domain/SeoModel";

const seoConfig: SEOConfig = {
    title: "My Website",
    titleTemplate: "%s | My Website",
    defaultTitle: "My Website",
    description: "This is the default description of my website.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.mywebsite.com/",
        site_name: "My Website",
        title: "My Website",
        description: "This is the default description of my website.",
        images: [
            {
                url: "https://www.mywebsite.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Og Image Alt",
            },
        ],
    },
    twitter: {
        cardType: "summary_large_image",
        site: "@mywebsite",
        creator: "@mywebsite",
        title: "My Website",
        description: "This is the default description of my website.",
        image: "https://www.mywebsite.com/og-image.jpg",
    },
    additionalMetaTags: [
        {
            name: "theme-color",
            content: "#000000",
        },
        {
            name: "msapplication-navbutton-color",
            content: "#000000",
        },
        {
            name: "apple-mobile-web-app-status-bar-style",
            content: "#000000",
        },
    ],
};

export default seoConfig;
