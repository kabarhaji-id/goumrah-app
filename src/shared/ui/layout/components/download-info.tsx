"use client";

import React from "react";
import Image from "next/image";
import {AppDownloadData} from "@/shared/types/FooterTypes";
import { useRouter } from "next/navigation";

/**
 * Props for the DownloadSection component
 */
interface DownloadSectionProps {
    data: AppDownloadData;
}


const DownloadInfo: React.FC<DownloadSectionProps> = ({data}) => {

    const router = useRouter();

    return (
        <div className="flex flex-col gap-6 min-w-40">
            <h3 className="text-base font-bold leading-6 text-white opacity-[0.92]">
                {data.sectionTitle}
            </h3>
            <div className="flex flex-col gap-4 max-sm:items-center">
                {/* App Store Button */}
                <button
                    onClick={() => router.push(data.appStore.href)}
                    className="cursor-pointer bg-transparent border-none p-0"
                >
                    <Image
                        src={data.appStore.imageSrc}
                        alt={data.appStore.imageAlt}
                        width={160}
                        height={50}
                        priority
                    />
                </button>

                {/* Google Play Button */}
                <button
                    onClick={() => router.push(data.googlePlay.href)}
                    className="flex gap-6 items-center px-5 py-2 rounded-xl border border-solid bg-neutral-800 border-slate-800 border-opacity-10 w-[203px] cursor-pointer"
                >
                    <Image
                        src={data.googlePlay.imageSrc}
                        alt={data.googlePlay.imageAlt}
                        width={40}
                        height={40}
                        priority
                    />
                    <div className="flex flex-col">
                        <span className="text-sm leading-5 text-white opacity-[0.82]">
                            {data.googlePlay.downloadText}
                        </span>
                        <span className="text-base font-medium leading-6 text-white opacity-[0.92]">
                            {data.googlePlay.storeName}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default DownloadInfo;
