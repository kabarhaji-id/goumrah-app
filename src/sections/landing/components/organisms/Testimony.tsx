interface Testimonial {
    name: string;
    review: string;
    rating: number;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function Testimony({ testimonials }: TestimonialsProps) {
    return (
        <section id="testimonials" className="py-16 px-6">
            <h2 className="text-3xl font-bold text-center text-green-700">Apa Kata Mereka?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-6 border rounded-lg shadow-md">
                        <p className="italic">"{testimonial.review}"</p>
                        <p className="mt-2 font-bold">- {testimonial.name}</p>
                        <p className="text-yellow-500">⭐ {testimonial.rating}/5</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
