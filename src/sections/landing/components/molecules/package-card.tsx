import { PackageItem } from "@/modules/landing/domain/landingModel";
import Image from "next/image";

import GoldAccent from "@/public/image/patterns/gold-accent.svg";
import SilverAccent from "@/public/image/patterns/silver-accent.svg";
import PlatinumAccent from "@/public/image/patterns/platinum-accent.svg";

import React from "react";
import PackageTags from "@/sections/landing/components/molecules/package-tags";
import DepartureInfo from "@/sections/landing/components/molecules/departure-info";
import PackageDetails from "@/sections/landing/components/molecules/package-detail";
import PriceInfo from "@/sections/landing/components/molecules/price-info";
import DoubleButton from "@/sections/landing/components/atoms/DoubleButtons";
import {FaWhatsapp} from "react-icons/fa";

export const PackageCard: React.FC<PackageItem> = ({
                                                       id,
                                                       image,
                                                       tags,
                                                       title,
                                                       departureDate,
                                                       details,
                                                       price,
                                                       category
                                                   }) => {

    // Handles when "Lihat Detail" is clicked
    const handlePackageDetailClick = () => {
        console.log("Detail button clicked for package:", title);
    };

    // Handles when "Chat via WhatsApp" is clicked
    const handleConsult = (message: string) => {
        console.log("Consultation requested for:", message);
    };

    return (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[14px] bg-white tracking-wide shadow-custom-sm">

            {/* Package Image Section */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px]">
                <Image
                    src={image}
                    alt={title}
                    title={title}
                    width={942}
                    height={708}
                    loading="eager"
                    className="aspect-[4/3] h-full rounded-[14px] object-cover"
                    priority quality={70}
                />

                {/* Accent Overlay */}
                <div className="absolute bottom-0 left-0 w-full">
                    {category === "silver" && <SilverAccent className="w-full" />}
                    {category === "gold" && <GoldAccent className="w-full" />}
                    {category === "platinum" && <PlatinumAccent className="w-full" />}
                </div>
            </div>

            {/* Package Info Section */}
            <div className="flex h-full w-full flex-col gap-2 bg-white p-3">

                {/* Package Tags */}
                <div className="space-y-0">
                    <PackageTags tags={tags} />
                </div>

                {/* Package Title */}
                <h2 className="font-bold text-primary-foreground text-lg">{title}</h2>

                {/* Departure Information */}
                <DepartureInfo departureDate={departureDate} />

                {/* Package Details (Flight, Hotels, etc.) */}
                <PackageDetails details={details} />

                {/* Price Information */}
                <PriceInfo prices={price} />

                {/* Double Button (Detail & WhatsApp) */}
                <DoubleButton
                    primaryLabel="Detail"
                    primaryOnClick={handlePackageDetailClick}
                    secondaryLabel="Konsultasi Sekarang"
                    secondaryOnClick={(event) => {
                        event.stopPropagation();
                        handleConsult("Paket Eksklusif");
                    }}
                    secondaryIcon={<FaWhatsapp />}
                    className="mt-4"
                />
            </div>
        </div>
    );
};
