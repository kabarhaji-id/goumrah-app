import Icon from "@/sections/landing/components/atoms/Icon";
import TextLabel from "@/sections/landing/components/atoms/TextLabel";

interface PackageDetailItemProps {
    icon: string;
    label: string;
    value: string;
    starRating?: number;
}

const PackageDetailItem: React.FC<PackageDetailItemProps> = ({icon, label, value, starRating}) => {
    return (
        <div className="flex items-start gap-1 text-[13px] leading-[18px] tracking-wide bg-red-400">
            <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
                {/* Uses Icon.tsx with starRating for hotels */}
                <Icon
                    src={`/assets/icons/${icon}.svg`}
                    alt={label}
                    variant={icon === "airline" ? "airline" : "hotel"}
                    starRating={icon === "hotel" ? starRating : undefined}
                />
            </div>

            <div className="flex justify-between bg-blue-500">
                <TextLabel bold={false} className="bg-amber-500">{label}</TextLabel>
                <span className="mr-3">:</span>
                <TextLabel bold={true}>{value}</TextLabel>
            </div>

        </div>


    );
}

export default PackageDetailItem;
