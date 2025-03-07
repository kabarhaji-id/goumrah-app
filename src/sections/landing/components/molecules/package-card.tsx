import { PackageItem } from "@/modules/landing/domain/landingModel";
import Image from "next/image";
import GoldAccent from "@/public/image/patterns/gold-accent.svg";
import SilverAccent from "@/public/image/patterns/silver-accent.svg";
import PlatinumAccent from "@/public/image/patterns/platinum-accent.svg";
import React, { useState, useEffect } from "react";
import PackageTags from "@/sections/landing/components/molecules/package-tags";
import DepartureInfo from "@/sections/landing/components/molecules/departure-info";
import PackageDetails from "@/sections/landing/components/molecules/package-detail";
import PriceInfo from "@/sections/landing/components/molecules/price-info";
import DoubleButton from "@/sections/landing/components/atoms/DoubleButtons";
import { FaWhatsapp } from "react-icons/fa";

export const PackageCard: React.FC<PackageItem> = ({
                                                       image,
                                                       tags,
                                                       title,
                                                       departureDate,
                                                       details,
                                                       price,
                                                       category
                                                   }) => {
    // Loading state to simulate fetching data
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 2000); // Simulate loading delay
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[14px] bg-white tracking-wide shadow-custom-sm">
            {/* Package Image Section */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px]">
                {isLoading ? (
                    <div className="animate-pulse bg-gray-300 h-full w-full"></div>
                ) : (
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
                )}

                {/* Accent Overlay */}
                {!isLoading && (
                    <div className="absolute bottom-0 left-0 w-full">
                        {category === "silver" && <SilverAccent className="w-full" />}
                        {category === "gold" && <GoldAccent className="w-full" />}
                        {category === "platinum" && <PlatinumAccent className="w-full" />}
                    </div>
                )}
            </div>

            {/* Package Info Section */}
            <div className="flex h-full w-full flex-col gap-2 bg-white p-3">
                {isLoading ? (
                    <div className="animate-pulse">
                        <div className="bg-gray-300 h-4 w-24 rounded-md mb-2"></div>
                        <div className="bg-gray-300 h-6 w-3/4 rounded-md mb-3"></div>
                        <div className="bg-gray-300 h-4 w-1/2 rounded-md mb-2"></div>
                        <div className="bg-gray-300 h-4 w-3/4 rounded-md mb-2"></div>
                        <div className="bg-gray-300 h-6 w-full rounded-md mb-3"></div>
                        <div className="bg-gray-300 h-10 w-full rounded-md"></div>
                    </div>
                ) : (
                    <>
                        {/* Package Tags */}
                        <div className="space-y-0">
                            <PackageTags tags={tags} />
                        </div>

                        {/* Package Title */}
                        <h2 className="font-bold text-primary-foreground text-lg text-left">{title}</h2>

                        {/* Departure Information */}
                        <DepartureInfo departureDate={departureDate} />

                        {/* Package Details (Flight, Hotels, etc.) */}
                        <PackageDetails details={details} />

                        {/* Price Information */}
                        <PriceInfo prices={price} />

                        {/* Double Button (Detail & WhatsApp) */}
                        <DoubleButton
                            primaryLabel="Detail"
                            primaryOnClick={() => console.log("Detail button clicked")}
                            secondaryLabel="Konsultasi Sekarang"
                            secondaryOnClick={(event) => {
                                event.stopPropagation();
                                console.log("Consulting via WhatsApp");
                            }}
                            secondaryIcon={<FaWhatsapp />}
                            className="mt-4"
                        />
                    </>
                )}
            </div>
        </div>
    );
};
