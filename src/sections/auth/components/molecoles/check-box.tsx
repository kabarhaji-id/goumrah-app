"use client";

import React, { useState } from "react";

interface CheckboxWithLabelProps {
    label: string;
    id: string;
    name: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

/**
 * CheckboxWithLabel component that combines a checkbox with a label
 * @param {string} label - Label text
 * @param {string} id - Checkbox ID for accessibility
 * @param {string} name - Checkbox name for form submission
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {Function} onChange - Change handler function
 */
const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
                                                                 label,
                                                                 id,
                                                                 name,
                                                                 checked: initialChecked = false,
                                                                 onChange,
                                                             }) => {
    const [checked, setChecked] = useState(initialChecked);

    const handleChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <div className="flex items-center">
                <div
                    className={`flex justify-center items-center rounded border-2 border-solid cursor-pointer border-slate-800 border-opacity-20 h-[18px] w-[18px] ${
                        checked ? "border-indigo-500" : ""
                    }`}
                    onClick={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            handleChange();
                        }
                    }}
                    role="checkbox"
                    aria-checked={checked}
                    tabIndex={0}
                    aria-labelledby={`${id}-label`}
                >
                    {checked && (
                        <div className="flex justify-center items-center w-3.5 h-3.5 bg-indigo-500 rounded-sm">
                            <svg
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                            >
                                <path
                                    d="M4.99987 7.85822L9.59587 3.26172L10.3034 3.96872L4.99987 9.27222L1.81787 6.09022L2.52487 5.38322L4.99987 7.85822Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    )}
                </div>
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                    className="sr-only"
                />
            </div>
            <label
                id={`${id}-label`}
                htmlFor={id}
                className="text-sm sm:text-base text-slate-800 text-opacity-90 cursor-pointer"
            >
                {label}
            </label>
        </div>
    );
};

export default CheckboxWithLabel;
