"use client";

import {useEffect, useState} from "react";
import FooterLink from "@/shared/ui/layout/components/footer-link";
import {LinkGroupData} from "@/shared/types/FooterTypes";
import {LuChevronDown, LuChevronUp} from "react-icons/lu";
import {useScreenType} from "@/shared/libs/useScreenTypes";

interface LinkGroupProps {
    data: LinkGroupData;
}

const LinkGroup: React.FC<LinkGroupProps> = ({data}) => {
    const screenType = useScreenType();
    const [isExpanded, setIsExpanded] = useState(screenType === "desktop");

    // Update state saat ukuran layar berubah
    useEffect(() => {
        setIsExpanded(screenType === "desktop");
    }, [screenType]);

    return (

        <div className="flex flex-col gap-4 min-w-40 w-full max-md:w-full">
            {/* Header dengan tombol toggle (icon di kanan pada mobile & tablet) */}
            <button
                className="flex justify-between items-center w-full text-base font-bold text-white opacity-[0.92] focus:outline-none"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {data.title}
                {/* Chevron hanya tampil di tablet & mobile, tersembunyi di desktop */}
                {screenType !== "desktop" && (<span className="ml-auto"> {/* Memindahkan ikon ke kanan */}
                        {isExpanded ? <LuChevronUp size={18}/> : <LuChevronDown size={18}/>}
                    </span>)}
            </button>

            {/* Navigasi (expandable di mobile/tablet, selalu terbuka di desktop) */}
            {isExpanded && (<nav className="flex flex-col gap-4 w-full" aria-label={data.title}>
                    {data.links.map((link, index) => (<FooterLink key={index} isNew={link.isNew} href={link.href}>
                            {link.text}
                        </FooterLink>))}
                </nav>)}
        </div>


    );
};

export default LinkGroup;
