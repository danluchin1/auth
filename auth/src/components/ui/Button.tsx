type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    size?: ButtonSize;
};

const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

const Button = ({
    loading,
    size='md',
    children,
    className='',
    ...props
}: ButtonProps) => (
    <button
        className={`
            bg-blue-600 text-white px-4 py-2 hover:bg-blue-700
            transition-transform hover:translate-y-[-2px]
            active:scale-[0.98] disabled:opacity-50
            ${sizeClasses[size]}
            ${className}
        `}
        disabled={loading || props.disabled}
        {...props}
    >
        {loading ? "Loading..." : children}
    </button>
);

export default Button;
