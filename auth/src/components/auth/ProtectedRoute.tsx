import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if(!user){
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;