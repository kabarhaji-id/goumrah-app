import { Benefit } from "@/modules/landing/domain/landingModel";
import Image from "next/image";

export const FeatureCard: React.FC<Benefit> = ({ title, subtitle, logo }) => {
    return (
        <div className="bg-gradient-to-b from-[#1E3A47] to-[#1F2937] rounded-2xl p-6 text-white shadow-lg text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-b from-teal-900 to-teal-700 flex items-center justify-center shadow-md mx-auto mb-4">
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
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm mt-2">{subtitle}</p>
        </div>
    );
};
