import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar";

const PublicLayout = () => {

    return(
        <div>
            <Navbar isAuthentificated={false}/>
            <Outlet />
        </div>
    );
}

export default PublicLayout;