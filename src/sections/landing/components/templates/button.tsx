interface ButtonProps {
    children: React.ReactNode;
    variant?: "solid" | "outline";
}

export function Button({ children, variant = "solid" }: ButtonProps) {
    return (
        <button
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                variant === "solid"
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
            }`}
        >
            {children}
        </button>
    );
}
