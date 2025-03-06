import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

import { LandingProvider } from "@/sections/landing/context/LandingContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navbar from "@/shared/ui/layout/Navbar";
import Footer from "@/shared/ui/layout/Footer";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import Head from "next/head";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-plus-jakarta",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.goumrah.id"; // ✅ Pastikan default

export const metadata: Metadata = {
    title: "Goumrah - Your Trusted Travel Partner", // ✅ Pastikan ini STRING
    description: "Plan your Umrah & Hajj with Goumrah",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={plusJakartaSans.variable}>
        <Head>
            {/* ✅ Gunakan .toString() untuk menghindari TS2322 */}
            <title>{metadata.title?.toString() ?? "Default Title"}</title>

            {/* ✅ Pastikan hanya string yang dimasukkan */}
            {metadata.description && <meta name="description" content={metadata.description.toString()} />}
            {metadata.title && <meta property="og:title" content={metadata.title.toString()} />}
            {metadata.description && <meta property="og:description" content={metadata.description.toString()} />}

            {/* ✅ Perbaiki og:url agar membaca dari .env */}
            <meta property="og:url" content={BASE_URL} />
            <meta property="og:type" content="website" />
        </Head>
        <body className="font-sans">
        <ThemeProvider>
            <LandingProvider>
                {/* Navbar is always at the top */}
                <Navbar />

                {/* Main Content Area */}
                {children}

                <ReactQueryProvider>
                    <Footer />
                </ReactQueryProvider>
            </LandingProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
