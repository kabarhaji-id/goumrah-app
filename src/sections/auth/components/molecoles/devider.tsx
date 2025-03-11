"use client";

import React from "react";

interface DividerProps {
    text: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
    return (
        <div className="flex gap-2 items-center mx-0 my-4">
            <div className="flex-1 h-px bg-slate-800 bg-opacity-10" />
            <div className="text-base text-slate-800 text-opacity-90">{text}</div>
            <div className="flex-1 h-px bg-slate-800 bg-opacity-10" />
        </div>
    );
};

export default Divider;
