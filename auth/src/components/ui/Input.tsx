type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => (
    <input
        className="w-full px-3 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:border-blue-500"
        {...props}
    />
)

export default Input;