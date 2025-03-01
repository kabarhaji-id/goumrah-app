"use client";

import React, { useState, useEffect } from "react";

interface RippleProps {
    color?: string;
    duration?: number;
}

interface Ripple {
    x: number;
    y: number;
    size: number;
    id: number;
}

export const RippleEffect: React.FC<RippleProps> = ({
                                                        color = "rgba(27, 131, 134, 0.3)", // teal-600 with opacity
                                                        duration = 600,
                                                    }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    useEffect(() => {
        const cleanup = ripples.map((ripple) => {
            return setTimeout(() => {
                setRipples((prevRipples) =>
                    prevRipples.filter((prev) => prev.id !== ripple.id),
                );
            }, duration);
        });

        return () => {
            cleanup.forEach((timeoutId) => clearTimeout(timeoutId));
        };
    }, [ripples, duration]);

    const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const size = Math.max(button.clientWidth, button.clientHeight);

        setRipples((prevRipples) => [
            ...prevRipples,
            {
                x,
                y,
                size,
                id: Date.now(),
            },
        ]);
    };

    return (
        <div className="absolute inset-0 overflow-hidden" onClick={createRipple}>
            {ripples.map((ripple) => (
                <div
                    key={ripple.id}
                    className="absolute rounded-full pointer-events-none animate-ripple"
                    style={{
                        left: ripple.x - ripple.size / 2,
                        top: ripple.y - ripple.size / 2,
                        width: ripple.size,
                        height: ripple.size,
                        backgroundColor: color,
                    }}
                />
            ))}
        </div>
    );
};
