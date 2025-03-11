"use client";

import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}
const ButtonLogin: React.FC<ButtonProps> = ({
                                           children,
                                           onClick,
                                           type = "button",
                                           className = "",
                                       }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`p-3 text-base font-medium bg-indigo-500 rounded-lg cursor-pointer border-[none] shadow-[0px_2px_6px_rgba(38,43,67,0.14)] text-white ${className}`}
        >
            {children}
        </button>
    );
};

export default ButtonLogin;
