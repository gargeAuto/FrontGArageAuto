import {useEffect, useState} from "react";
import api from "../api/api.ts";
import {Alert, Box} from "@mui/material";
import DashboardAppointmentsGrid from "../component/DashboardAppointmentsGrid.tsx";
import CustomerCards from "../component/CustomerCards.tsx";
import type {Customer} from "../type/customer.ts";
import {fetchCustomers} from "../api/customer-api.ts";

const DashboardGaragiste = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCustomers()
            .then((customers: Customer[]) => {
                setCustomers(customers);
            })
        const fetchData = async () => {
            try {
              //  const responseCustomer = await api.get("/newusers");
              //  const responseCustomerSearch = await api.get("/getUserSearch");
                const responseAppointments = await api.get("/appointments-per-day");

/*
                if (responseCustomer.data?.data.data) {
                    setCustomers(responseCustomer.data.data.data);
                    console.log(responseCustomer.data?.data.data);
                } else {
                    setError("Aucun utilisateur trouvé");
                }
*/

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
           }}>

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

                {customers.map(customer => (
                    <CustomerCards customer={customer} key={customer.id}/>
                ))}
            </Box>

        </Box>
    );
}
export default DashboardGaragiste;
