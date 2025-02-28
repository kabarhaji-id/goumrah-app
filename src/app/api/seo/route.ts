
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query; // Get the slug from query params

    if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Slug is required' });
    }

    // Simulate dynamic SEO data retrieval based on the slug
    const seoData = {
        title: `Dynamic Title for ${slug}`,
        titleTemplate: `%s | Dynamic Website`,
        defaultTitle: 'Dynamic Website',
        description: `This is the description for the ${slug} page.`,
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: `https://dynamicwebsite.com/${slug}`,
            site_name: 'Dynamic Website',
            title: `OG Title for ${slug}`,
            description: `OG Description for the ${slug} page.`,
            images: [
                {
                    url: `https://dynamicwebsite.com/${slug}/image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `Image for ${slug}`,
                },
            ],
        },
        twitter: {
            cardType: 'summary_large_image',
            site: '@dynamicwebsite',
            creator: '@dynamicwebsite',
            title: `Twitter Title for ${slug}`,
            description: `Twitter Description for the ${slug} page.`,
            image: `https://dynamicwebsite.com/${slug}/image.jpg`,
        },
        additionalMetaTags: [
            { name: 'theme-color', content: '#000000' },
            { name: 'msapplication-navbutton-color', content: '#000000' },
            { name: 'apple-mobile-web-app-status-bar-style', content: '#000000' },
        ],
    };

    res.status(200).json(seoData); // Send the SEO data for the requested page
}
