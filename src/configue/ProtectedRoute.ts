import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getUserRole, isTokenExpired} from "./auth";

const ProtectedRoute = ({children, role}) => {
    const navigate = useNavigate();
    const userRole = getUserRole();

    useEffect(() => {
        if (isTokenExpired()) {
            navigate("/login-form");
        } else if (role && userRole !== role) {
            navigate("/");
        }
    }, [navigate, userRole, role]);

    if (!userRole || isTokenExpired() || (role && userRole !== role)) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
