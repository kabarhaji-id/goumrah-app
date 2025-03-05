import { useState, useEffect } from "react";
import FlightInfo from "@/sections/landing/components/molecules/flight-info";
import HotelInfo from "@/sections/landing/components/molecules/hotel-info";
import { PackageDetailItem } from "@/modules/landing/domain/landingModel";
import ResponsiveWrapper from "@/sections/landing/components/atoms/ResponsiveWrapper";

interface PackageDetailsProps {
    details: PackageDetailItem[];
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ details = [] }) => {
    const airlineDetail = details.find((detail) => detail.label.toLowerCase() === "maskapai");
    const hotelDetails = details.filter((detail) =>
        ["madinah", "makkah"].includes(detail.label.toLowerCase())
    );

    return (
        <div className="space-y-2">
            {airlineDetail && (
                <ResponsiveWrapper>
                    <FlightInfo airLines={airlineDetail}/>
                </ResponsiveWrapper>
            )}
            {hotelDetails.map((hotelDetail) => (
                <ResponsiveWrapper key={hotelDetail.label}>
                    <HotelInfo detail={hotelDetail}/>
                </ResponsiveWrapper>
            ))}
        </div>
    );
};

export default PackageDetails;
