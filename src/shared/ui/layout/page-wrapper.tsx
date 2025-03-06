"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import { Seo, Analytics, FacebookPixel } from "@/sections/seo";
import ReactPixel from "react-facebook-pixel";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "";

export const PageWrapper = ({
                                children,
                                className,
                            }: {
    children: React.ReactNode;
    className?: string;
}) => {
    const pathname = usePathname(); // ✅ Deteksi perubahan halaman

    useEffect(() => {
        if (META_PIXEL_ID) {
            ReactPixel.pageView(); // ✅ Facebook Pixel tracking otomatis
        }
    }, [pathname]); // Dipanggil ulang setiap kali halaman berubah

    return (
        <>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={classNames("min-h-screenHeightWithoutHeader", className)}
            >
                <Seo />
                <FacebookPixel />
                <Analytics />

                {children}

            </motion.div>
        </>
    );
};
