import { Benefit } from "@/modules/landing/domain/landingModel";
import Image from "next/image";
import { useScreenType } from "@/shared/libs/useScreenTypes";
import clsx from "clsx"; // Install with: npm install clsx

export const FeatureCard: React.FC<Benefit> = ({ title, subtitle, logo }) => {
    const screenType = useScreenType();

    // Mapping screenType to padding sizes
    const paddingSize = {
        mobile: "p-4",
        tablet: "p-6",
        desktop: "p-8"
    }[screenType];

    return (
        <div className="relative p-[2px] rounded-2xl h-full flex bg-gradient-to-br from-[#002626] to-[#1B8386]">
            {/* Inner Card with Responsive Padding & Gradient Background */}
            <div
                className={clsx(
                    "rounded-2xl h-full backdrop-blur-lg w-full",
                    "bg-[linear-gradient(to_bottom_right,#002626_0%,#1B8386_50%)]",
                    "flex flex-col items-center justify-center text-center",
                    "min-h-[250px] md:min-h-[300px] lg:min-h-[320px]",
                    paddingSize
                )}
            >
                {/* Icon Wrapper with Gradient Stroke */}
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#002626] to-[#1B8386] p-[2px]">
                    <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-b from-teal-900 to-teal-700">
                        {logo && (
                            <Image
                                src={`/assets/icons/${logo.replace(/^\/?icons\//, '')}`}
                                alt={title}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mt-4">{title}</h3>

                {/* Subtitle (Ensures consistent height across cards) */}
                <p className="text-sm mt-2 text-white/80">{subtitle}</p>
            </div>
        </div>
    );
};
