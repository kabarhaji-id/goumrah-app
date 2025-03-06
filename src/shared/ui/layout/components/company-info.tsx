"use client";

import React from "react";
import LogoLight from "@/public/icons/logo/light-logo.svg";
import {CompanyInfoData} from "@/shared/types/FooterTypes";
import PPIUInfo from "@/shared/ui/layout/components/ppui-info";


interface CompanyInfoProps {
    data: CompanyInfoData;
}
const CompanyInfo: React.FC<CompanyInfoProps> = ({ data }) => {
    return (
        <div className="flex flex-col flex-1 gap-4 items-start min-w-[360px] max-md:min-w-[300px] max-sm:w-full max-sm:min-w-[unset]">
            <div className="px-0 py-1">
                <LogoLight />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <h3 className="text-base font-bold leading-6 text-white opacity-[0.78]">
                    Office
                </h3>
                <p className="text-sm leading-5 text-white opacity-[0.78]">
                    {data.office.address}
                </p>
            </div>

            <div className="flex flex-col gap-1 w-full">
                <h3 className="text-base font-bold leading-6 text-white opacity-[0.78]">
                    Customer Service
                </h3>
                <p className="text-sm leading-5 text-white opacity-[0.78]">
                    {data.customerService.phone}
                </p>
                <p className="text-sm leading-5 text-white opacity-[0.78]">
                    {data.customerService.email}
                </p>
            </div>

            <hr className="mx-0 my-4 w-full h-px bg-teal-50" />

            <PPIUInfo licenseInfo={data.ppiuLicense} />
        </div>
    );
};

export default CompanyInfo;
