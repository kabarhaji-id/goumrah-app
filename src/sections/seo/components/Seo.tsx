"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';  // For dynamic route parameters
import { DefaultSeo } from 'next-seo';
import { SEOConfig } from '@/modules/seo/domain/SeoModel'; // Adjust import based on your project structure

// Assuming you have your SeoService to fetch dynamic SEO data
import { SeoService } from '@/modules/seo/application/SeoService';
import { SeoRepository } from '@/modules/seo/infrastructure/SeoRepository';

// Create instances of SeoRepository and SeoService
const seoRepository = new SeoRepository();
const seoService = new SeoService(seoRepository);

export default function SeoPage() {
    const { slug } = useParams();  // Get the dynamic route parameter (slug)
    const [seoData, setSeoData] = useState<SEOConfig | null>(null);

    // Fallback SEO data in case the SEO data is not available
    const fallbackSeoData: SEOConfig = {
        title: 'Default Title',
        titleTemplate: '%s | Default Website',
        defaultTitle: 'Default Website',
        description: 'Default Description',
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

    // Fetch SEO data when the component mounts
    useEffect(() => {
        const fetchSeoData = async () => {
            try {
                const data = await seoService.getSeoData(slug);  // Pass slug to the SEO service
                setSeoData(data || null);  // Use fallback data if no SEO data is returned
            } catch (error) {
                console.error('Error fetching SEO data:', error);
                setSeoData(null);  // Fallback to default if there's an error
            }
        };

        fetchSeoData();
    }, [slug]); // Fetch new data when the slug changes

    // Use fallback data if seoData is not available
    const dataToRender = seoData || fallbackSeoData;

    return (
        <DefaultSeo
            title={dataToRender.title}
            titleTemplate={dataToRender.titleTemplate}
            defaultTitle={dataToRender.defaultTitle}
            description={dataToRender.description}
            canonical={`https://dynamicwebsite.com/${slug}`} // Assuming you want the canonical URL
            facebook={{
                appId: '1234567890', // Your Facebook App ID (Optional)
            }}
            openGraph={dataToRender.openGraph}
            additionalMetaTags={dataToRender.additionalMetaTags}
            twitter={dataToRender.twitter}
            themeColor="#000000" // Optional: specify the theme color for your site
            dangerouslySetAllPagesToNoIndex={false} // Set this based on your requirement
            dangerouslySetAllPagesToNoFollow={false} // Set this based on your requirement
            defaultOpenGraphImageWidth={1200} // Set default OG image width
            defaultOpenGraphImageHeight={630} // Set default OG image height
            defaultOpenGraphVideoWidth={1280} // Set default OG video width
            defaultOpenGraphVideoHeight={720} // Set default OG video height
            mobileAlternate={{
                media: 'only screen and (max-width: 640px)',
                href: 'https://dynamicwebsite.com/mobile', // Mobile alternate URL
            }}
            languageAlternates={[
                {
                    hrefLang: 'en',
                    href: 'https://dynamicwebsite.com/en',
                },
                {
                    hrefLang: 'es',
                    href: 'https://dynamicwebsite.com/es',
                },
            ]}
            additionalLinkTags={[
                {
                    rel: 'icon',
                    href: 'https://dynamicwebsite.com/favicon.ico',
                },
            ]}
            robotsProps={{
                noindex: false,
                nofollow: false,
            }}
            norobots={false} // Use this if you want to prevent robots from indexing the page
        />
    );
}
