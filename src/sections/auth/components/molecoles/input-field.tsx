"use client";

import React, { useState } from "react";

interface InputFieldProps {
    type: string;
    placeholder: string;
    id: string;
    name: string;
    required?: boolean;
    icon?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputField: React.FC<InputFieldProps> = ({ type,placeholder, id, name, required = false, icon, onChange,}) => {
    const [inputType, setInputType] = useState(type);

    // Toggle password visibility if type is password
    const togglePasswordVisibility = () => {
        if (type === "password") {
            setInputType(inputType === "password" ? "text" : "password");
        }
    };

    return (
        <div className="relative">
            <input
                type={inputType}
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                className="px-4 py-3 w-full h-11 sm:h-12 text-sm sm:text-base rounded-lg border border-solid border-slate-800 border-opacity-20 text-slate-800 text-opacity-90"
                aria-label={placeholder}
            />
            {type === "password" && (
                <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={
                        inputType === "password" ? "Show password" : "Hide password"
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            togglePasswordVisibility();
                        }
                    }}
                >
                    <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                    >
                        <path
                            d="M9.99972 2.77222C14.4931 2.77222 18.2314 6.00555 19.0156 10.2722C18.2322 14.5389 14.4931 17.7722 9.99972 17.7722C5.50639 17.7722 1.76805 14.5389 0.983887 10.2722C1.76722 6.00555 5.50639 2.77222 9.99972 2.77222ZM9.99972 16.1055C11.6993 16.1052 13.3484 15.5279 14.6771 14.4682C16.0058 13.4085 16.9355 11.9291 17.3139 10.2722C16.9341 8.61664 16.0038 7.13889 14.6752 6.08057C13.3466 5.02226 11.6983 4.44599 9.99972 4.44599C8.30113 4.44599 6.65279 5.02226 5.3242 6.08057C3.9956 7.13889 3.06536 8.61664 2.68555 10.2722C3.06397 11.9291 3.99361 13.4085 5.32234 14.4682C6.65106 15.5279 8.30016 16.1052 9.99972 16.1055ZM9.99972 14.0222C9.00516 14.0222 8.05133 13.6271 7.34807 12.9239C6.64481 12.2206 6.24972 11.2668 6.24972 10.2722C6.24972 9.27765 6.64481 8.32383 7.34807 7.62057C8.05133 6.9173 9.00516 6.52222 9.99972 6.52222C10.9943 6.52222 11.9481 6.9173 12.6514 7.62057C13.3546 8.32383 13.7497 9.27765 13.7497 10.2722C13.7497 11.2668 13.3546 12.2206 12.6514 12.9239C11.9481 13.6271 10.9943 14.0222 9.99972 14.0222ZM9.99972 12.3555C10.5523 12.3555 11.0822 12.1361 11.4729 11.7454C11.8636 11.3547 12.0831 10.8248 12.0831 10.2722C12.0831 9.71968 11.8636 9.18978 11.4729 8.79908C11.0822 8.40838 10.5523 8.18888 9.99972 8.18888C9.44719 8.18888 8.91728 8.40838 8.52658 8.79908C8.13588 9.18978 7.91639 9.71968 7.91639 10.2722C7.91639 10.8248 8.13588 11.3547 8.52658 11.7454C8.91728 12.1361 9.44719 12.3555 9.99972 12.3555Z"
                            fill="#262B43"
                            fillOpacity="0.9"
                        />
                    </svg>
                </div>
            )}
            {icon && icon}
        </div>
    );
};

export default InputField;
