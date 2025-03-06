"use client";

import React from "react";
import Link from "next/link";

interface FooterLinkProps {
    children: React.ReactNode;
    isNew?: boolean;
    href?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ children, isNew, href = "#" }) => (
    <div className="flex gap-2.5 items-center">
        <Link
            href={href}
            className="text-sm leading-6 text-white cursor-pointer opacity-[0.78] hover:opacity-100 transition-opacity"
        >
            {children}
        </Link>
        {isNew && (
            <span className="px-2 py-0.5 text-sm font-medium leading-5 rounded-2xl bg-emerald-950 bg-opacity-30 text-slate-200">
                Baru
            </span>
        )}
    </div>
);

export default FooterLink;
