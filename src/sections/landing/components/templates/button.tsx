"use client";

import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                  variant = "primary",
                                                  children,
                                                  icon,
                                                  className = "",
                                                  ...props
                                              }) => {
    const baseStyles =
        "px-4 py-2.5 rounded-xl min-h-9 text-sm font-medium leading-none transition-colors duration-200" +
        " focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2" +
        " hover:bg-teal-700 active:bg-teal-800";

    const variantStyles = {
        primary: "bg-teal-600 text-white",
        secondary: "bg-teal-600 text-teal-50",
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${
                icon ? "flex items-center gap-2 justify-center" : ""
            } ${className}`}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
};
