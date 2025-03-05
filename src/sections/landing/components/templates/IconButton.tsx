"use client";

import * as React from "react";
import { Button } from "./button";
import { IconType } from "react-icons";

interface IconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: IconType;
    children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
                                                          Icon,
                                                          children,
                                                          className = "",
                                                          ...props
                                                      }) => {
    return (
        <Button
            variant="secondary"
            className={`flex gap-1 justify-center items-center flex-1 basis-0 ${className}`}
            {...props}
        >
            <Icon className="shrink-0 self-stretch my-auto w-[18px] h-[18px]" />
            <span className="self-stretch my-auto">{children}</span>
        </Button>
    );
};
