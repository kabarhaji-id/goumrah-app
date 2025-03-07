import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

import { LandingProvider } from "@/sections/landing/context/LandingContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navbar from "@/shared/ui/layout/Navbar";
import ReactQueryProvider from "@/context/ReactQueryProvider"; // ⬅️ Pastikan import

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-plus-jakarta",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.goumrah.id"; // ✅ Pastikan default

export const metadata: Metadata = {
    title: "Goumrah - Your Trusted Travel Partner",
    description: "Plan your Umrah & Hajj with Goumrah",
    openGraph: {
        title: "Goumrah - Your Trusted Travel Partner",
        description: "Plan your Umrah & Hajj with Goumrah",
        url: BASE_URL,
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={plusJakartaSans.variable}>
        <body className={plusJakartaSans.variable}>
        <ReactQueryProvider> {/* ⬅️ Pindahkan ke sini agar seluruh aplikasi punya akses */}
            <ThemeProvider>
                <LandingProvider>
                    {/* Navbar is always at the top */}
                    <Navbar />

                    {/* Main Content Area */}
                    {children}

                </LandingProvider>
            </ThemeProvider>
        </ReactQueryProvider>
        </body>
        </html>
    );
}
