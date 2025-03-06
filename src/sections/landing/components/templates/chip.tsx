import React from "react";
import { cn } from "@/shared/libs/utils";
import { cva, VariantProps } from "class-variance-authority";

const chipVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-xs font-display font-semibold transition-colors focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-white border border-primary-accent rounded-[8px] text-primary-foreground/75 hover:bg-subtle/75",
                primary: "bg-primary text-white font-normal",
                "class-platinum":
                    "bg-gradient-to-br from-zinc-950 to-zinc-500 text-white",
                secondary:
                    "bg-subtle-background border border-subtle text-primary-foreground/75 hover:bg-subtle/75",
                outline:
                    "bg-white border border-subtle text-primary-foreground/75 hover:bg-subtle/75",
                destructive: "bg-[#EF44441A] border border-[#EF4444] rounded-[10px]",
                luxury: "bg-white/15 border border-[1.5px] border-[#FFFFFF03]",
            },
            size: {
                default: "h-fit",
                lg: "h-8 px-2 py-1.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

interface ChipProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof chipVariants> {}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(chipVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Chip.displayName = "Chip";

export { Chip };
