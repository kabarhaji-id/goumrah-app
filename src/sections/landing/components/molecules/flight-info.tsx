import { PackageDetailItem } from "@/modules/landing/domain/landingModel";
import TextLabel from "@/sections/landing/components/templates/TextLabel";
import CustomMaskapaiIcon from "@/public/icons/custom-icon/icon-maskapai.svg";
import ResponsiveWrapper from "@/sections/landing/components/atoms/ResponsiveWrapper";

interface AirlineInfoProps {
    airLines: PackageDetailItem;
}

const FlightInfo: React.FC<AirlineInfoProps> = ({ airLines }) => {
    return (
        <ResponsiveWrapper className="text-[13px] leading-[18px] tracking-wide">
            <CustomMaskapaiIcon className="flex flex-shrink-0" />
            <TextLabel text={airLines.label} className="w-[70px]" />
            <TextLabel text=":" />
            <TextLabel text={airLines.value} bold />
        </ResponsiveWrapper>
    );
};

export default FlightInfo;
