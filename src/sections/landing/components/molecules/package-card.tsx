import {PackageItem} from "@/modules/landing/domain/landingModel";
import Image from "next/image";

import GoldAccent from "@/public/image/patterns/gold-accent.svg";
import SilverAccent from "@/public/image/patterns/silver-accent.svg";
import PlatinumAccent from "@/public/image/patterns/platinum-accent.svg";

import React from "react";
import PackageTags from "@/sections/landing/components/molecules/package-tags";
import DepartureInfo from "@/sections/landing/components/molecules/departure-info";
import PackageDetails from "@/sections/landing/components/molecules/package-detail";


export const PackageCard: React.FC<PackageItem> = ({
                                                       id,
                                                       image,
                                                       tags,
                                                       title,
                                                       departureDate,
                                                       details,
                                                       price,
                                                       buttonLabel,
                                                       category
                                                   }) => {
    return (<div
            className="flex h-full w-full flex-col overflow-hidden rounded-[14px] bg-white tracking-wide shadow-custom-sm">

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px]">
                {/* Gambar Utama */}
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

                {/* Aksen Overlapping */}
                <div className="absolute bottom-0 left-0 w-full">
                    {category === "silver" && <SilverAccent className="w-full"/>}
                    {category === "gold" && <GoldAccent className="w-full"/>}
                    {category === "platinum" && <PlatinumAccent className="w-full"/>}
                </div>
            </div>

        <div className="flex !h-full w-full flex-col gap-2 bg-white p-3">
            <div className="space-y-0">
                <PackageTags tags={tags}/>
            </div>
            <h2 className="font-bold text-primary-foreground text-lg">{title}</h2>

            <DepartureInfo departureDate={departureDate} />

            <PackageDetails details={details} />

        </div>


        </div>
    );
};
