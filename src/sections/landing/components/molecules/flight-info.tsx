import PackageDetailItem from "@/sections/landing/components/molecules/package-detail-item";

interface FlightInfoProps {
    airline: string;
}

const FlightInfo: React.FC<FlightInfoProps> = ({ airline }) => {
    return (
        <PackageDetailItem
            icon="airline"
            label="Maskapai"
            value={airline}// Example: Flight icon 24x24
        />
    );
};

export default FlightInfo;
