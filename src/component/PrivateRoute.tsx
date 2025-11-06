import {Navigate, useLocation} from "react-router";
import {useContext} from "react";
import {UserContexte} from "../AllContexte/UserContexte.tsx";

export default function PrivateRoute({children}: { children: JSX.Element }) {
    const {isLogUser, setIsLogUser, loading} = useContext(UserContexte);
    const location = useLocation();

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!isLogUser) {
        return <Navigate to="/Login-Form" state={{from: location}} replace/>;
    }

    return children;
}
