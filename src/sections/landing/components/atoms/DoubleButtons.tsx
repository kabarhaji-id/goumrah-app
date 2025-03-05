"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/sections/landing/components/templates/button";

interface DoubleButtonProps {
    primaryLabel: string;
    primaryOnClick: () => void;
    secondaryLabel: string;
    secondaryOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    secondaryIcon?: ReactNode;
    className?: string;
}

const DoubleButton: React.FC<DoubleButtonProps> = ({
                                                       primaryLabel,
                                                       primaryOnClick,
                                                       secondaryLabel,
                                                       secondaryOnClick,
                                                       secondaryIcon,
                                                       className,
                                                   }) => {
    return (
        <div className={`flex w-full gap-2 ${className}`}>
            {/* Primary Button - Smaller */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-[0.5]">
                <Button
                    variant="primary"
                    className="h-11 w-full px-4 rounded-lg text-sm font-medium"
                    onClick={primaryOnClick}
                >
                    {primaryLabel}
                </Button>
            </motion.div>

            {/* Secondary Button - Wider */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-[1.5]">
                <Button
                    variant="primary"
                    className="h-11 w-full px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    icon={secondaryIcon}
                    onClick={secondaryOnClick}
                >
                    {secondaryLabel}
                </Button>
            </motion.div>
        </div>
    );
};

export default DoubleButton;
