"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dummyLandingData } from "@/modules/landing/infrastructure/landingDumyData";
import { NavIcon } from "@/modules/landing/domain/landingModel";

// Import ikon sebagai React Components
import HomeIcon from "@/public/icons/home.svg";
import KaabaIcon from "@/public/icons/kaaba.svg";
import FaqIcon from "@/public/icons/faq-filled.svg";
import AboutIcon from "@/public/icons/about-us.svg";
import BlogIcon from "@/public/icons/blog-icon.svg";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    HomeIcon,
    KaabaIcon,
    FaqIcon,
    AboutIcon,
    BlogIcon,
};

export default function BottomNavigation() {
    const pathname = usePathname();
    const [activeIndex, setActiveIndex] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const currentIndex = dummyLandingData.mobileMenu.findIndex(
            (item) => item.path === pathname
        );
        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        }
    }, [pathname]);

    useEffect(() => {
        updateIndicatorPosition(activeIndex);
    }, [activeIndex]);

    const updateIndicatorPosition = (index: number) => {
        const currentItem = itemRefs.current[index];
        if (!currentItem || !navRef.current) return;

        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = currentItem.getBoundingClientRect();

        setIndicatorStyle({
            transform: `translateX(${itemRect.left - navRect.left}px)`,
            width: `${itemRect.width}px`,
        });
    };

    return (
        <nav
            ref={navRef}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-md md:hidden rounded-t-3xl"
        >
            <div className="relative">
                {/* Indicator untuk menu aktif */}
                <div
                    className="absolute top-0 h-1 bg-teal-600 transition-all duration-300 ease-in-out rounded-full"
                    style={indicatorStyle}
                />

                {/* Menu navigasi */}
                <div className="flex justify-around items-center h-16">
                    {dummyLandingData.mobileMenu.map((item: NavIcon, index) => {
                        const IconComponent = iconMap[item.icon];

                        return (
                            <Link
                                key={item.label}
                                href={item.path}
                                className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative ${
                                    pathname === item.path ? "text-teal-600" : "text-slate-600"
                                }`}
                                aria-current={pathname === item.path ? "page" : undefined}
                            >
                                {/* Render Icon */}
                                {IconComponent ? (
                                    <IconComponent className="w-6 h-6" />
                                ) : (
                                    <span />
                                )}

                                {/* Label */}
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
