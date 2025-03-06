import {PackagesContent} from "@/modules/landing/domain/landingModel";
import PackageSlider from "@/sections/landing/components/molecules/PackageSlider";

export default function SliderPackages({silver, gold, platinum}: PackagesContent) {
    return (

        <div className="container mx-auto px-4 mt-6 max-w-screen-xl">
            <PackageSlider
                title={silver.header.title ?? ""}
                subtitle={silver.header.subtitle ?? ""}
                packages={silver.packages}
            />
            <PackageSlider
                title={gold.header.title ?? ""}
                subtitle={gold.header.subtitle ?? ""}
                packages={gold.packages}
            />
            <PackageSlider
                title={platinum.header.title ?? ""}
                subtitle={platinum.header.subtitle ?? ""}
                packages={platinum.packages}
            />
        </div>

    );
}
