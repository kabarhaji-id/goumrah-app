
import { PackageDetailItem } from "@/modules/landing/domain/landingModel";
import ResponsiveWrapper from "@/sections/landing/components/atoms/ResponsiveWrapper";
import {Rating2} from "@/sections/landing/components/templates/getRating";
import TextLabel from "@/sections/landing/components/templates/TextLabel";

interface HotelInfoProps {
    detail: PackageDetailItem;
    className?: string;
}

const HotelInfo: React.FC<HotelInfoProps> = ({ detail, className = "" }) => {
    return (
        <ResponsiveWrapper className={`text-[13px] leading-[18px] tracking-wide ${className}`}>
            <Rating2 starsRating={detail.rating} />
            <TextLabel text={detail.label} className="w-[70px]" />
            <TextLabel text=":" className="mr-0.5" />
            <TextLabel text={detail.value} bold className="w-auto" />
        </ResponsiveWrapper>
    );
};

export default HotelInfo;
