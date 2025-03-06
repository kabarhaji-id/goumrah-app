import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Seo, Analytics, FacebookPixel } from "@/sections/seo";
import { LandingProvider } from "@/sections/landing/context/LandingContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navbar from "@/shared/ui/layout/Navbar";
import Footer from "@/shared/ui/layout/Footer";
import ReactQueryProvider from "@/context/ReactQueryProvider";

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

                {/* Navbar is always at the top */}
                <Navbar />

                {/* Main Content Area */}
                <div className="min-h-screen flex flex-col">
                    {children}
                </div>

                <ReactQueryProvider>
                    <Footer />
                </ReactQueryProvider>
            </LandingProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
