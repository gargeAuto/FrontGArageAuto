import {getUserRole} from "../configue/auth.tsx";
import {useNavigate} from "react-router-dom";

const NavBarButtons = ({}) => {
    const navigate = useNavigate();

    return (
        <>
            {(getUserRole() === "admin" || getUserRole() === "technicien")&& (
                <button onClick={() => navigate("/dashboard-garage/agenda")}>Agenda</button>)}
            {(getUserRole() === "admin" || getUserRole() === "technicien") && (
                <button onClick={() => navigate("/dashboard-garage/clients")}>Clients</button>)}
            {getUserRole() === "admin" && (
                <button onClick={() => navigate("/dashboard-garage/employee")}>Employers</button>)}
        </>
    );
};

export default NavBarButtons;

// TODO map de button + style