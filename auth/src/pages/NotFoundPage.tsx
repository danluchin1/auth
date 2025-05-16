import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center pt-10 text-2xl">
            <span className="font-bold">404 Not Found</span>
            <Link to="/" className="hover:underline">Home</Link>
        </div>
    );
};

export default NotFoundPage;
