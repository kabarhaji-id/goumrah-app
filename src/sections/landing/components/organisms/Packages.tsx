interface PackageProps {
    packages: Record<string, {
        title: string;
        subtitle: string;
        features: string[];
        price: string;
        buttonText: string;
    }>;
}

export default function Packages({ packages }: PackageProps) {
    return (
        <section id="packages" className="py-16 px-6">
            <h2 className="text-3xl font-bold text-center text-green-700">Pilih Paket Umroh</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {Object.entries(packages).map(([key, pkg]) => (
                    <div key={key} className="p-6 border rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold">{pkg.title}</h3>
                        <p className="text-gray-600">{pkg.subtitle}</p>
                        <ul className="mt-4 space-y-2">
                            {pkg.features.map((feature, index) => {
                                console.log(`DATA ${feature}`);
                                return <li key={index}>✅ {feature}</li>;
                            })}
                        </ul>
                        <p className="mt-4 font-bold text-lg">{pkg.price}</p>
                        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md">{pkg.buttonText}</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
