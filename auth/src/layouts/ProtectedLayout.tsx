import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar";
import { useAuth } from "../contexts/AuthContext";


const ProtectedLayout = () => {
    const { user, logout } = useAuth();

    return(
        <div>
            <Navbar isAuthentificated={true} user={user} onLogout={logout} />
            <Outlet />
        </div>
    );
}

export default ProtectedLayout;