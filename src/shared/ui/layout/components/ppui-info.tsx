import {PPIULicenseInfo} from "@/shared/types/FooterTypes";
import Kemenag from "@/public/icons/logo/kemenag.svg";
import SiskoPatuh from "@/public/icons/logo/sisko-patuh.svg";
import React from "react";
/**
 * Props for the PPIUInfo component
 */
interface PPIUInfoProps {
    licenseInfo: PPIULicenseInfo;
}

/**
 * PPIUInfo component that displays PPIU license information
 *
 * @param {PPIUInfoProps} props - The component props
 * @returns {JSX.Element} The rendered PPIU information section
 */
const PPIUInfo: React.FC<PPIUInfoProps> = ({ licenseInfo }) => {
    return (
        <div className="flex flex-col justify-center gap-1 w-full">
            <div className="flex gap-2 items-center">
                <div className="w-fit h-[41px]">
                    <Kemenag className="w-full h-full"/>
                </div>
                <div className="w-[85px] h-[36px]">
                    <SiskoPatuh className="w-full h-full"/>
                </div>
            </div>

            <div>
                <h3 className="text-base font-bold leading-6 text-white opacity-[0.78]">
                    Nomor Izin PPIU
                </h3>
                <p className="text-base font-bold leading-6 text-white opacity-[0.78]">
                    {licenseInfo.licenseNumber}
                </p>
                <p className="text-sm leading-5 text-white opacity-[0.78]">
                    {licenseInfo.licenseDetails}
                </p>
            </div>
        </div>
    );
};

export default PPIUInfo;