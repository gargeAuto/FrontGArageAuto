import {Box, Button } from "@mui/material";
import {getUserRole} from "../configue/auth.tsx";
import {useNavigate} from "react-router-dom";

const NavBarButtons = ({}) => {
    const navigate = useNavigate();

    return (
        <Box sx={{display:"flex", flexDirection:"row", gap:2 }}>
            {(getUserRole() === "admin" || getUserRole() === "technicien") && (
                <Button variant="contained" onClick={() => navigate("/dashboard-garage/agenda")}>Agenda</Button>)}
            {(getUserRole() === "admin" || getUserRole() === "technicien") && (
                <Button variant="contained" onClick={() => navigate("/dashboard-garage/clients")}>Clients</Button>)}
            {getUserRole() === "admin" && (
                <Button variant="contained" onClick={() => navigate("/dashboard-garage/employee")}>Employers</Button>)}

        </Box>

    );
};

export default NavBarButtons;

// TODO map de button + style