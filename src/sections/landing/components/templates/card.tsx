import { cn } from "@/modules/landing/infrastructure/utils/cn";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={cn("bg-white shadow-md rounded-xl p-6 border", className)}>
            {children}
        </div>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return <div className={cn("mt-2", className)}>{children}</div>;
}
