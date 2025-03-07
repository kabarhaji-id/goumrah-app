"use client";

import React, { useState } from "react";
import { LuLogIn, LuMenu, LuX } from "react-icons/lu";
import LogoDark from "@/public/icons/logo/dark-logo.svg";
import { usePathname, useRouter } from "next/navigation";
import BottomNavigation from "@/sections/landing/components/molecules/MobileMenu";
import Link from "next/link";
import {useScreenType} from "@/shared/libs/useScreenTypes"; // Import custom hook

interface NavigationItem {
    label: string;
    path: string;
}

const navigationItems: NavigationItem[] = [
    { label: "Beranda", path: "/" },
    { label: "Paket", path: "/paket" },
    { label: "Blog", path: "/blog" },
    { label: "Goumrah Care", path: "/care" },
    { label: "Tentang Kami", path: "/tentang" },
];

export default function Navbar() {
    const screenType = useScreenType(); // Gunakan custom hook
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="bg-white shadow-md">
                <div className="container max-w-screen-xl mx-auto flex justify-between items-center h-[62px] px-6 md:px-10 lg:px-16">
                    {/* Logo */}
                    <Link href="/" aria-label="Home" className="flex items-center">
                        <LogoDark className="w-auto h-auto" />
                    </Link>

                    {/* Navigation (Hanya tampil di desktop) */}
                    {screenType === "desktop" && (
                        <nav className="flex gap-4 items-center" aria-label="Main navigation">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className={`px-3 py-2 text-sm font-medium ${
                                        pathname === item.path ? "font-bold text-teal-600" : "text-gray-800"
                                    } rounded-md hover:bg-teal-50 hover:text-teal-600 transition-all`}
                                    aria-current={pathname === item.path ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    )}

                    {/* Login Button (Hanya tampil di desktop) */}
                    {screenType === "desktop" && (
                        <button
                            className="flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-all focus:ring-2 focus:ring-teal-500"
                            onClick={handleLogin}
                            aria-label="Login"
                        >
                            <LuLogIn color="white" className="mr-2" size={18} />
                            <span className="text-base font-medium leading-6 text-teal-50">Masuk</span>
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    {(screenType === "mobile" || screenType === "tablet") && (
                        <button
                            className="flex items-center p-2 rounded-md focus:ring-2 focus:ring-teal-500"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle Mobile Menu"
                        >
                            {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                        </button>
                    )}
                </div>
            </header>

            {/* Bottom Navigation untuk Mobile & Tablet */}
            {(screenType === "mobile" || screenType === "tablet") && <BottomNavigation />}


        </>
    );
}
