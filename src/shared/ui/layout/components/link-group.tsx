"use client";

import FooterLink from "@/shared/ui/layout/components/footer-link";
import {LinkGroupData} from "@/shared/types/FooterTypes";

interface LinkGroupProps {
    data: LinkGroupData;
}

const LinkGroup: React.FC<LinkGroupProps> = ({ data }) => (
    <div className="flex flex-col gap-6 min-w-40">
        <h3 className="text-base font-bold leading-6 text-white opacity-[0.92]">{data.title}</h3>
        <nav className="flex flex-col gap-4" aria-label={data.title}>
            {data.links.map((link, index) => (
                <FooterLink key={index} isNew={link.isNew} href={link.href}>
                    {link.text}
                </FooterLink>
            ))}
        </nav>
    </div>
);

export default LinkGroup;
