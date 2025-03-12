import type { Metadata } from "next";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LandingProvider } from "@/sections/landing/context/LandingContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import SessionProviderWrapper from "@/context/SessionProvider"; // Import new wrapper

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-plus-jakarta",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.goumrah.id";

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
        <SessionProviderWrapper> {/* Wrap session provider in a separate client component */}
            <ReactQueryProvider>
                <ThemeProvider>
                    <LandingProvider>{children}</LandingProvider>
                </ThemeProvider>
            </ReactQueryProvider>
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
