import {useEffect, useState} from "react";
import api from "../api.ts";
import {Alert, Box} from "@mui/material";
import DashboardAppointmentsGrid from "../component/DashboardAppointmentsGrid.tsx";
import CustomerCards from "../component/CustomerCards.tsx";

const DashboardGaragiste = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUsers = await api.get("/newusers");
                const responseAppointments = await api.get("/appointments-per-day");

                if (responseUsers.data?.data.data) {
                    setUsers(responseUsers.data.data.data);
                    console.log(responseUsers.data?.data.data);
                } else {
                    setError("Aucun utilisateur trouvé");
                }

                            if (responseAppointments.data?.data) {
                                setAppointments(responseAppointments.data.data);
                                console.log(responseAppointments.data.data);
                            } else {
                                setError("Aucun rendez-vous trouvé");
                            }

            } catch (err: any) {
                setError(err.message || "Erreur inconnue");
            }
        };

        fetchData();
    }, []);

    return (

        <Box sx={{display: "flex", flexDirection: "row", gap: 2, width: "100%", padding: 2, alignItems: "flex-start",
            mt: "60px"}}>
            <Box sx={{flex: 1}}>
                <DashboardAppointmentsGrid appointments={appointments}/>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                }}
            >
                {error && <Alert>{error}</Alert>}

                {users.map(user => (
                    <CustomerCards customer={user} key={user.id}/>
                ))}
            </Box>
        </Box>
    );
}
export default DashboardGaragiste;
