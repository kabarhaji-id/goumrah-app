import FlightInfo from "@/sections/landing/components/molecules/flight-info";
import HotelInfo from "@/sections/landing/components/molecules/hotel-info";
import {PackageDetailItem} from "@/modules/landing/domain/landingModel";

interface PackageDetailsProps {
    details: PackageDetailItem[];
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ details=[] }) => {
    const flight = details.find(({ icon }) => icon === "airline")?.value || "TBA";
    const madinahHotel = details.find(({ label }) => label === "Madinah");
    const makkahHotel = details.find(({ label }) => label === "Makkah");

    return (
        <div className="space-y-2">
            <FlightInfo airline={flight} />
            <HotelInfo
                location="Madinah"
                hotelName={madinahHotel?.value || "TBA"}
                rating={madinahHotel?.rating ?? 0}
            />

            <HotelInfo
                location="Makkah"
                hotelName={makkahHotel?.value || "TBA"}
                rating={makkahHotel?.rating ?? 0}
            />
        </div>
    );
};

export default PackageDetails;
