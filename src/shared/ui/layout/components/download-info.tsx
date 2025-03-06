"use client";

import React from "react";
import { AppDownloadData } from "@/shared/types/FooterTypes";
import { useRouter } from "next/navigation";
import AppStore from "@/public/image/app-store.svg";
import GoogleStore from "@/public/image/play-store.svg";
import {useScreenType} from "@/shared/libs/useScreenTypes";

/**
 * Props for the DownloadSection component
 */
interface DownloadSectionProps {
    data: AppDownloadData;
}

const DownloadInfo: React.FC<DownloadSectionProps> = ({ data }) => {
    const router = useRouter();
    const screenType = useScreenType();

    return (
        <div className="flex flex-col gap-6 min-w-40 w-full">
            <h3 className="text-base font-bold leading-6 text-white opacity-[0.92]">
                {data.sectionTitle}
            </h3>

            {/* Jika tablet atau mobile, gunakan flex-row + gap */}
            <div
                className={`flex ${
                    screenType !== "desktop" ? "flex-row gap-6 justify-center" : "flex-col gap-4"
                }`}
            >
                {/* App Store Button */}
                <button onClick={() => router.push(data.appStore)} className={`${screenType !== "desktop" ? "w-fit" : "w-[150px]"}`}>
                    <AppStore/>
                </button>

                {/* Google Play Button */}
                <button onClick={() => router.push(data.playStore)} className={`${screenType !== "desktop" ? "w-fit" : "w-[150px]"}`}>
                    <GoogleStore/>
                </button>
            </div>
        </div>
    );
};

export default DownloadInfo;
