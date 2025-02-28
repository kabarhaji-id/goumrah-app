interface WhyChooseUsProps {
    title: string;
    benefits: string[];
}

export default function WhyChooseUs({ title, benefits }: WhyChooseUsProps) {
    return (
        <section id="why" className="py-16 px-6 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-green-700">{title}</h2>
            <ul className="mt-6 space-y-3 max-w-lg mx-auto">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                        ✅ {benefit}
                    </li>
                ))}
            </ul>
        </section>
    );
}
