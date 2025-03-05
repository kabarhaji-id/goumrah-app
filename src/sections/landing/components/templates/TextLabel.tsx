interface LabelProps {
    text: string;
    bold?: boolean;
    className?: string;

}

const TextLabel: React.FC<LabelProps> = ({text, bold = false, className = ""}) => {
    return (
        <span className={`text-sm tracking-wide leading-none text-neutral-800 ${bold ? "font-bold" : ""} ${className}`} >
            {text}
        </span>
    );
};

export default TextLabel;
