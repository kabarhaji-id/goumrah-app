import { ReactNode } from "react";

interface ResponsiveWrapperProps {
    children: ReactNode;
    className?: string;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children, className = "" }) => {
    return (
        <div className={`flex flex-wrap sm:flex-nowrap items-center gap-1 ${className}`}>
            {children}
        </div>
    );
};

export default ResponsiveWrapper;
