"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { DefaultSeo, NextSeo } from "next-seo";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";
import { SeoService } from "@/modules/seo/application/SeoService";
import { SeoRepository } from "@/modules/seo/infrastructure/SeoRepository";

// Ambil BASE_URL dari .env atau gunakan default
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://goumrah.id";

// Inisialisasi SEO Service
const seoRepository = new SeoRepository();
const seoService = new SeoService(seoRepository);

export default function Seo() {
    const pathname = usePathname();
    const [seoData, setSeoData] = useState<SEOConfig | null>(null);

    // Data SEO default (jika API tidak mengembalikan data)
    const fallbackSeoData: SEOConfig = {
        title: "Default Title",
        titleTemplate: "%s | Goumrah",
        defaultTitle: "Goumrah - Your Travel Partner",
        description: "Best Umrah & Hajj Services",
        openGraph: {
            type: "website",
            locale: "en_US",
            url: `${BASE_URL}${pathname}`,
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
            { name: "robots", content: "index, follow" }, // ✅ Robots Meta Tag
            { name: "theme-color", content: "#ffffff" }, // ✅ Warna tema browser
        ],
    };

    useEffect(() => {
        const fetchSeoData = async () => {
            try {
                const data = await seoService.getSeoData(pathname);
                setSeoData(data || null);
                console.log("SEO Data Loaded:", data || fallbackSeoData); // ✅ Debugging
            } catch (error) {
                console.error("Error fetching SEO data:", error);
                setSeoData(null);
            }
        };

        fetchSeoData();
    }, [pathname]);

    // Gunakan data API jika tersedia, jika tidak pakai fallback
    const dataToRender = seoData || fallbackSeoData;

    return (
        <>
            <DefaultSeo
                title={dataToRender.title}
                titleTemplate={dataToRender.titleTemplate}
                defaultTitle={dataToRender.defaultTitle}
                description={dataToRender.description}
                canonical={`${BASE_URL}${pathname}`}
                openGraph={dataToRender.openGraph}
                twitter={dataToRender.twitter}
                additionalMetaTags={dataToRender.additionalMetaTags}
            />
            <NextSeo
                title={dataToRender.title}
                description={dataToRender.description}
                canonical={`${BASE_URL}${pathname}`}
                openGraph={dataToRender.openGraph}
                twitter={dataToRender.twitter}
            />
        </>
    );
}
