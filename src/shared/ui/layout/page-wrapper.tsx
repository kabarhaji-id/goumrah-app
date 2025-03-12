"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Seo, Analytics, FacebookPixel } from "@/sections/seo";
import ReactPixel from "react-facebook-pixel";
import { SEOConfig } from "@/modules/seo/domain/SeoModel";
import { SeoService } from "@/modules/seo/application/SeoService";
import { SeoRepository } from "@/modules/seo/infrastructure/SeoRepository";
import Navbar from "@/shared/ui/layout/Navbar";
import Footer from "@/shared/ui/layout/Footer";

const seoService = new SeoService(new SeoRepository());
const META_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "";

export const PageWrapper = ({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}) => {
    const pathname = usePathname();
    const [metadata, setMetadata] = useState<SEOConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Hide Navbar & Footer on login and register pages
    const isAuthPage = ["/auth/login", "/auth/register"].includes(pathname);

    useEffect(() => {
        async function fetchSEO() {
            try {
                const seoData = await seoService.getSeoData(pathname);
                setMetadata(seoData);
            } catch (error) {
                console.error("Failed to fetch SEO data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSEO();

        if (META_PIXEL_ID) {
            ReactPixel.pageView();
        }
    }, [pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hide Navbar on login and register pages */}
            {!isAuthPage && <Navbar />}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={classNames("flex-grow", className)}
            >
                <Seo metadata={metadata!} />
                <FacebookPixel />
                <Analytics />
                {isLoading ? <div className="flex-grow" /> : children}
            </motion.div>

            {/* Hide Footer on login and register pages */}
            {!isAuthPage && <Footer />}
        </div>
    );
};
