"use client";

import React, { useEffect, useState } from "react";
import { LuLogIn, LuMenu, LuX } from 'react-icons/lu';
import LogoDark from "@/public/icons/logo/dark-logo.svg";
import { usePathname } from "next/navigation";
import BottomNavigation from "@/sections/landing/components/molecules/MobileMenu";
import Link from "next/link";

interface NavigationItem {
    label: string;
    path: string;
    isActive?: boolean;
}

const navigationItems: NavigationItem[] = [
    { label: "Beranda", path: "/" },
    { label: "Paket", path: "/paket" },
    { label: "Blog", path: "/blog" },
    { label: "GoumrahCare", path: "/care" },
    { label: "Tentang Kami", path: "/tentang" },
];

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname(); // Perbaikan pengambilan path aktif

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogin = () => {
        console.log("Login clicked");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="bg-white shadow-md">
                <div className="container max-w-screen-xl mx-auto flex justify-between items-center h-[62px] px-6 md:px-10 lg:px-16">
                    {/* Logo */}
                    <Link href="/public" aria-label="Home" className="flex items-center">
                        <LogoDark className="w-[127px] h-[40px]" />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex gap-4 items-center" aria-label="Main navigation">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                className={`px-3 py-2 text-sm font-medium ${
                                    pathname === item.path
                                        ? "font-bold text-teal-600"
                                        : "text-gray-800"
                                } rounded-md hover:bg-teal-50 hover:text-teal-600 transition-all`}
                                aria-current={pathname === item.path ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Login Button */}
                    <button
                        className="hidden md:flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-all focus:ring-2 focus:ring-teal-500"
                        onClick={handleLogin}
                        aria-label="Login"
                    >
                        <LuLogIn color="white" className="mr-2" size={18} />
                        <span className="text-base font-medium leading-6 text-teal-50">Masuk</span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex items-center p-2 rounded-md focus:ring-2 focus:ring-teal-500"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle Mobile Menu"
                    >
                        {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                    </button>
                </div>
            </header>

            {/* Bottom Navigation untuk Mobile */}
            {isMobile && <BottomNavigation />}
        </>
    );
}
