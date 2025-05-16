import { Link, NavLink } from "react-router";
import Button from "./Button";
import { User } from "firebase/auth";

type NavbarProps = {
    isAuthentificated: boolean;
    user?: User | null;
    onLogout?: () => void;
}

const Navbar = ({ isAuthentificated, user, onLogout } : NavbarProps) => {
    return (
        <div className="fixed w-full top-0 flex place-content-between px-4 py-2 bg-white shadow-sm">
            <div className="flex items-center gap-6">
                <NavLink to="/" className="hover:underline">Welcome!</NavLink>
                {isAuthentificated && (
                    <>
                        <NavLink 
                            to={`/dashboard/${user?.uid}`}
                            className={({ isActive }) => 
                                `hover:underline ${isActive ? 'text-blue-600' : ''}`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </>
                )}
            </div>
            <div className="flex items-center gap-4">
                {isAuthentificated ? (
                    <>
                        <span>{user?.email}</span>
                        <Button onClick={onLogout} className="rounded-3xl">
                            Log out
                        </Button>
                    </>
                ) : (
                    <>
                        <Button className="rounded-3xl">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button className="rounded-3xl">
                            <Link to="/register">Sign Up</Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;

