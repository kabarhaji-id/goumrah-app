import {SinglePackageContent} from "@/modules/landing/domain/landingModel";
import Image from "next/image";

interface SinglePackagesProps {
    singlePackages: SinglePackageContent;
}

export function SinglePackages({ singlePackages }: SinglePackagesProps) {
    return (
        <section className="px-52 py-6 max-md:p-6 max-sm:p-4">
            <header className="mb-12 text-center">
                <h2 className="mb-2 text-base font-semibold leading-6 text-emerald-950">
                    {singlePackages.header.title}
                </h2>
                <h1 className="text-4xl font-extrabold leading-10 text-teal-600 max-sm:text-3xl">
                    {singlePackages.header.subtitle || "Umrah Ideal dengan Momen Tak Terlupakan mulai dari 22 jt"}
                </h1>
            </header>

            <div className="flex gap-6 justify-between max-md:flex-col max-md:items-center">
                {[singlePackages.silver, singlePackages.gold, singlePackages.platinum].map((pkg) => (
                    <div key={pkg.id} className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
                        <Image src={pkg.image} alt={pkg.title} width={400} height={250} className="rounded-lg" />
                        <h3 className="mt-4 text-xl font-bold text-gray-800">{pkg.title}</h3>
                        <p className="text-gray-600">{pkg.date}</p>
                        <p className="mt-2 text-lg font-semibold text-green-600">{pkg.price.current}</p>
                        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                            {pkg.buttonLabel}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
