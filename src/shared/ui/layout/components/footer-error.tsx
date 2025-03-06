"use client";

import React from "react";

/**
 * Props for the FooterError component
 */
interface FooterErrorProps {
    error: Error | null;
    onRetry: () => void;
}

/**
 * FooterError component that displays an error message when footer data fetching fails
 *
 * @param {FooterErrorProps} props - The component props
 * @returns {JSX.Element} The rendered error component
 */
const FooterError: React.FC<FooterErrorProps> = ({ error, onRetry }) => {
    return (
        <footer
            className="flex flex-col items-center px-52 py-12 bg-teal-600 max-md:px-10 max-md:py-12 max-sm:px-5 max-sm:py-8"
            aria-label="Site footer error"
        >
            <div className="flex flex-col items-center justify-center w-full max-w-[1200px] py-8">
                <div className="text-white text-center mb-4">
                    <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
                    <p className="text-sm opacity-80 mb-4">
                        {error?.message || "Failed to load footer data. Please try again."}
                    </p>
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 bg-white text-teal-700 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                        aria-label="Retry loading footer data"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default FooterError;
