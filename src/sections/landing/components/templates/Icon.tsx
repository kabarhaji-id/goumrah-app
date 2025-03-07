import Image from "next/image";
import {LuStar} from "react-icons/lu";


interface IconProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    variant?: "default" | "hotel" | "airline"; // Different icon types
    starRating?: number; // Optional star rating for hotels
}

const Icon: React.FC<IconProps> = ({ src, alt, width, height, className, variant = "default", starRating }) => {
    const sizeMap = {
        default: { width: 24, height: 24 },
        airline: { width: 56, height: 13 }, // Flight icon size
        hotel: { width: 22, height: 30 }, // Hotel icon size
    };

    const selectedSize = sizeMap[variant] || sizeMap.default;

    return (
        <div className="flex justify-between gap-1 font-medium h-auto w-[50px]]">
            {/* Main Icon */}
            <Image
                src={src}
                alt={alt}
                width={width || selectedSize.width}
                height={height || selectedSize.height}
                className={className}
            />

            {/* If variant is "hotel", show the star + rating */}
            {variant === "hotel" && starRating !== undefined && starRating > 0 && (
                <div className="flex items-center -gap-1">
                    <LuStar size={22} fill="yellow"/>
                    <span className="text-lg font-bold text-teal-700">{starRating}</span>
                </div>
            )}
        </div>
    );
};

export default Icon;
