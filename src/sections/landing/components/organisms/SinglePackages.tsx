import { SinglePackageContent } from "@/modules/landing/domain/landingModel";
import { PackageCard } from "@/sections/landing/components/molecules/package-card";

export function SinglePackages({ header, silver, platinum, gold }: SinglePackageContent) {
    return (
        <section className="container max-w-screen-xl mx-auto px-4">
            <header className="mb-12 text-center">
                <h2 className="mb-2 text-base font-semibold leading-6 text-emerald-950">
                    {header.title}
                </h2>
                <h1 className="text-4xl font-extrabold leading-10 text-teal-600 max-sm:text-3xl">
                    {header.subtitle}
                </h1>
            </header>

            <div className="flex gap-6 justify-between max-md:flex-col max-md:items-center">
                {[silver, gold, platinum].map((pkg) => (
                    <PackageCard key={pkg.id} {...pkg} />
                ))}
            </div>
        </section>
    );
}
