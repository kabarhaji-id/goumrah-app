interface TextLabelProps {
    children: React.ReactNode;
    className?: string;
    bold?: boolean;
}

const TextLabel: React.FC<TextLabelProps> = ({ children, className, bold = false }) => {
    return (
        <span className={`text-sm mt-1 leading-[18px] tracking-wide ${bold ? "font-bold" : ""} ${className}`}>
            {children}
        </span>
    );
};

export default TextLabel;
