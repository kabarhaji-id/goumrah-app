interface FAQProps {
    faq: { question: string; answer: string }[];
}

export default function FAQ({ faq }: FAQProps) {
    return (
        <section id="faq" className="py-16 px-6 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-green-700">Pertanyaan Umum</h2>
            <ul className="mt-6 space-y-4">
                {faq.map((item, index) => (
                    <li key={index}>
                        <p className="font-bold">{item.question}</p>
                        <p className="text-gray-700">{item.answer}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
