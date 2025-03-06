import {Tag} from "@/modules/landing/domain/landingModel";
import {Chip} from "@/sections/landing/components/templates/chip";
import {CustomSwiper} from "@/sections/landing/components/atoms/Swiper";
import React from "react";
import Image from "next/image";


interface PackageTagsProps {
    tags: Tag[];
}


const PackageTags: React.FC<PackageTagsProps> = ({tags}) => {


    return (
        <CustomSwiper padding={0} gap={8}>

            {tags.map((tag, index) => {

                console.log(`Tag ${index}:`, tag); // Debugging: Logs the tag data

                const displayLabel = tag.label;
                const displayIcon = tag.icon;

                // Rotate only the plane icon if label is NOT "Langsung"
                const shouldRotate = tag.icon === "plane" && tag.label !== "Langsung";


                // Ensure the icon path is correctly formatted
                const imageUrl = `/assets/icons/${displayIcon.replace(/^\/?icons\//, '')}.svg`;



                return (
                    <Chip key={index} variant="default" className="overflow-hidden">
                        <div className="bg-primary-accent py-[3px] pl-1 pr-0.5">
                            <Image
                                src={imageUrl}
                                alt={displayLabel}
                                width={24}
                                height={24}
                                className={`h-4 w-4 ${shouldRotate ? 'rotate-90' : ''}`}
                            />
                        </div>
                        <span className="py-0.5 pl-1 pr-1.5 text-[12.5px] font-semibold leading-[18px] text-neutral-foreground">
                            {displayLabel}
                        </span>
                    </Chip>
                );
            })}

        </CustomSwiper>);

}


export default PackageTags;