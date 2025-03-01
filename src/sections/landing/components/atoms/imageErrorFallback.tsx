import React from "react";

interface ImageErrorFallbackProps {
    message?: string;
    retry?: () => void;
}

export const ImageErrorFallback: React.FC<ImageErrorFallbackProps> = ({ message = "Failed to load image",retry }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-4">
            <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
            <p className="text-gray-600 text-center mb-4">{message}</p>
            {retry && (
                <button
                    onClick={retry}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    aria-label="Retry loading image"
                >
                    Retry
                </button>
            )}
        </div>
    );
};
