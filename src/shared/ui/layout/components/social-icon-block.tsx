"use client";

import React from "react";
import { FaSquareXTwitter, FaInstagram, FaLinkedin, FaTiktok, FaSquareFacebook, FaYoutube, FaThreads } from "react-icons/fa6";
import SocialIcon from "@/shared/ui/layout/components/social-button";


/**
 * SocialIconGroup component - A molecule component that groups social media icons
 *
 * @returns {JSX.Element} A navigation element containing social media icons
 */
const SocialIconGroup: React.FC = () => {
    // Social media icons with Lucide React components
    const socialIcons = [
        {
            name: "Facebook",
            Icon: FaSquareFacebook,
            href: "https://facebook.com",
        },
        {
            name: "Instagram",
            Icon: FaInstagram,
            href: "https://instagram.com",
        },
        {
            name: "LinkedIn",
            Icon: FaLinkedin,
            href: "https://linkedin.com",
        },
        {
            name: "TikTok",
            Icon: FaTiktok, // Using Music as a substitute for TikTok since Lucide doesn't have a TikTok icon
            href: "https://tiktok.com",
        },
        {
            name: "Twitter",
            Icon: FaSquareXTwitter,
            href: "https://twitter.com",
        },
        {
            name: "Threads",
            Icon: FaThreads, // Using MessageCircle as a substitute for Threads
            href: "https://threads.net",
        },
        {
            name: "YouTube",
            Icon: FaYoutube,
            href: "https://youtube.com",
        },
    ];

    return (
        <nav
            className="flex gap-2 justify-end items-center opacity-[0.78] max-sm:justify-center"
            aria-label="Social media links"
        >
            {socialIcons.map((icon, index) => (
                <SocialIcon
                    key={index}
                    Icon={icon.Icon}
                    ariaLabel={`${icon.name} link`}
                    href={icon.href}
                />
            ))}
        </nav>
    );
};

export default SocialIconGroup;
