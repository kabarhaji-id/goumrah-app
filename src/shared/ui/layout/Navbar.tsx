"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuLogIn, LuMenu, LuX } from "react-icons/lu";
import LogoDark from "@/public/icons/logo/dark-logo.svg";
import { usePathname, useRouter } from "next/navigation";
import BottomNavigation from "@/sections/landing/components/molecules/MobileMenu";
import Link from "next/link";
import { useScreenType } from "@/shared/libs/useScreenTypes";
import Avatar from "@/shared/ui/layout/menu/Avatar";
import ProfileMenu from "@/shared/ui/layout/menu/Profile";
import { useAuth } from "@/shared/hooks/useAuth";

const navigationItems = [
    { label: "Beranda", path: "/" },
    { label: "Paket", path: "/paket" },
    { label: "Blog", path: "/blog" },
    { label: "Goumrah Care", path: "/care" },
    { label: "Tentang Kami", path: "/tentang" },
];

export default function Navbar() {
    const screenType = useScreenType();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth(); // ✅ Ambil user dari authMiddleware
    const profileRef = useRef<HTMLDivElement>(null);

    const handleLogin = () => {
        router.push("/auth/login");
    };

    const handleLogout = () => {
        // Hapus token dari cookies
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect ke home
        router.push("/");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    // ✅ Handle klik di luar Profile Menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container max-w-screen-xl mx-auto flex justify-between items-center h-[62px] px-6 md:px-10 lg:px-16">
                    <Link href="/" aria-label="Home" className="flex items-center">
                        <LogoDark className="w-auto h-auto" />
                    </Link>

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

                    {/* ✅ Auth Section */}
                    {screenType === "desktop" && (
                        <div className="relative" ref={profileRef}>
                            {!user ? (
                                <button
                                    className="flex items-center px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition-all focus:ring-2 focus:ring-teal-500"
                                    onClick={handleLogin}
                                    aria-label="Login"
                                >
                                    <LuLogIn className="mr-2" size={18} />
                                    Masuk
                                </button>
                            ) : (
                                <>
                                    <button onClick={toggleProfileMenu} className="flex items-center gap-2">
                                        <Avatar imageUrl={user?.image || "/assets/image/default-avatar.jpg"} />
                                    </button>
                                    {isProfileOpen && (
                                        <ProfileMenu role={user.role} handleLogout={handleLogout} />
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {(screenType === "mobile" || screenType === "tablet") && (
                        <button onClick={toggleMobileMenu} className="flex items-center p-2">
                            {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                        </button>
                    )}
                </div>
            </header>

            {(screenType === "mobile" || screenType === "tablet") && <BottomNavigation />}
        </>
    );
}
