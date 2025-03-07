const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://goumrah.id";

export const fallbackSeoData = {
    title: "Default Title",
    titleTemplate: "%s | Goumrah",
    defaultTitle: "Goumrah - Your Travel Partner",
    description: "Best Umrah & Hajj Services",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: BASE_URL,
        site_name: "Goumrah",
        title: "Goumrah - Trusted Umrah Service",
        description: "Plan your Umrah & Hajj easily with Goumrah.",
        images: [
            {
                url: `${BASE_URL}/default-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Goumrah Banner",
            },
        ],
    },
    twitter: {
        cardType: "summary_large_image",
        site: "@goumrah",
        creator: "@goumrah",
        title: "Goumrah - Travel with Ease",
        description: "Best Hajj & Umrah Services",
        image: `${BASE_URL}/default-image.jpg`,
    },
    additionalMetaTags: [
        { name: "robots", content: "index, follow" },
    ],
};
