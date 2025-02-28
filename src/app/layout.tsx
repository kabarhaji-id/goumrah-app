import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Seo, Analytics, FacebookPixel } from "@/sections/seo";
import { LandingProvider } from "@/sections/landing/context/LandingContext";
import { ThemeProvider } from "@/context/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-plus-jakarta", // Custom CSS variable
});

export const metadata: Metadata = {
    title: "My App",
    description: "Best services in town",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={plusJakartaSans.variable}>
            <body className="font-sans">
                <ThemeProvider>
                    <LandingProvider>
                        <Seo />
                        <Analytics />
                        <FacebookPixel />
                        {children}
                    </LandingProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
