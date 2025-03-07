"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

/**
 * Props for the SocialIcon component
 */
interface SocialIconProps {
    Icon: IconType;
    ariaLabel?: string;
    href?: string;
}

/**
 * SocialIcon component - An atomic component for rendering social media icons
 */
const SocialIcon: React.FC<SocialIconProps> = ({ Icon, ariaLabel, href }) => {
    const router = useRouter();

    const iconElement = (
        <Icon className="w-[18px] h-[18px] text-white" aria-hidden="true" />
    );

    const handleNavigation = (event: React.MouseEvent) => {
        event.preventDefault();
        if (href) {
            router.push(href); // 🔹 Menggunakan Next.js Navigation
        }
    };

    if (href?.startsWith("http")) {
        // ✅ Link eksternal tetap menggunakan <a>
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1 hover:opacity-80 transition-opacity"
                aria-label={ariaLabel || "Social media link"}
            >
                {iconElement}
            </a>
        );
    }

    // ✅ Link internal menggunakan Next.js navigation
    return (
        <button
            onClick={handleNavigation}
            className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1 hover:opacity-80 transition-opacity"
            aria-label={ariaLabel || "Social media link"}
        >
            {iconElement}
        </button>
    );
};

export default SocialIcon;
