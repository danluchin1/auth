type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
};

const Label = ({
    children,
    required=false,
    className='',
    ...props
}: LabelProps) => (
    <div className="mb-2">
        <label
            className={`block text-sm font-medium text-gray-700${className}`}
            {...props}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    </div>
)

export default Label;