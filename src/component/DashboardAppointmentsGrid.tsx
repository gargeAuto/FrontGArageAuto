import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {Box, Paper, Typography, TextField, Stack, Chip} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

// Version DataGrid, propre, stylée, intermédiaire
// Colonnes: heure, client, véhicule, service, durée, note

export default function DashboardAppointmentsGrid({appointments = []}) {
    const [query, setQuery] = useState("");

    const isToday = (iso) => {
        const d = new Date(iso);
        const n = new Date();
        return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
    };

    const rows = useMemo(() => {
        const filtered = appointments.filter((a) => isToday(a.selectedStart));
        const q = query.toLowerCase().trim();
        if (!q) return filtered;
        return filtered.filter((a) =>
            (a.customerId || "").toLowerCase().includes(q) ||
            (a.vehicle || "").toLowerCase().includes(q) ||
            (a.service || "").toLowerCase().includes(q) ||
            (a.note || "").toLowerCase().includes(q)
        );
    }, [appointments, query]);

    const columns = [
        {
            field: "selectedStart",
            headerName: "Heure",
            width: 110,
            renderCell: (params) => {
                const start = params.row.selectedStart;
                if (!start) return "-";

                const normalized = start.replace(" ", "T");
                const d = new Date(normalized);

                const formatted = d.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit"
                });

                return (
                    <Chip
                        label={formatted}
                        size="small"
                        color="info"
                        variant="outlined"
                        sx={{fontWeight: 600}}
                    />
                );
            }

        },
        {field: "customer_name", headerName: "Client", width: 160},
        {field: "car_immat", headerName: "Véhicule",
            renderCell: (params) => {
                const {car_make, car_model, car_immat, car_km} = params.row;

                return (
                    <Stack spacing={0.3}>
                        <Typography sx={{fontWeight: 600, fontSize: "0.85rem"}}>
                            {car_make || "Marque ?"} {car_model || ""}
                        </Typography>

                        <Typography sx={{fontSize: "0.75rem", opacity: 0.8}}>
                            Immat : {car_immat || "—"}
                        </Typography>

                        {car_km && (
                            <Chip
                                label={`${car_km} km`}
                                size="small"
                                color="secondary"
                                variant="outlined"
                                sx={{fontSize: "0.65rem"}}
                            />
                        )}
                    </Stack>
                );
            },
            width: 140},
        {
            field: "service_wording",
            headerName: "Service",
            width: 140,
            renderCell: (params) => <Chip label={params.value || "—"} color="primary" variant="outlined" size="small"/>,
        },
        {
            field: "service_delay",
            headerName: "Durée",
            width: 100,
            renderCell: (params) => <Chip label={params.value || "30m"} color="secondary" size="small"/>,
        },

    ];

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", mb: 2}}>
                <Typography variant="h5">Rendez-vous aujourd'hui</Typography>
                <Stack>
                    <Chip label={`${rows.length} résultats`} variant="outlined"/>
                </Stack>
            </Stack>

            {rows.length === 0 ? (
                <Paper sx={{p: 4, borderRadius: 3, boxShadow: 2}}>
                    <Typography variant="h6" sx={{opacity: 0.7}}>
                        Aucun rendez-vous aujourd'hui
                    </Typography>
                </Paper>
            ) : (
                <Paper sx={{height: 480, borderRadius: 3, overflow: "hidden", boxShadow: 2}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(r) => r.appointment_id ?? ""}
                        sx={{border: "none"}}
                        initialState={{pagination: {paginationModel: {pageSize: 8}}}}
                        pageSizeOptions={[5, 8, 12, 24]}
                    />
                </Paper>
            )}
        </Box>
    );
}

DashboardAppointmentsGrid.propTypes = {
    appointments: PropTypes.array,
};

export const demoAppointments = [
    {
        id: "a1",
        start: new Date().setHours(9, 0),
        clientName: "M. Dupont",
        vehicle: "Clio 4",
        service: "Vidange",
        duration: "45m",
        note: "Pneus à vérifier"
    },
    {
        id: "a2",
        start: new Date().setHours(10, 30),
        clientName: "Mme Martin",
        vehicle: "208",
        service: "Freinage",
        duration: "1h",
        note: ""
    },
    {
        id: "a3",
        start: new Date().setHours(14, 0),
        clientName: "Garage AutoPro",
        vehicle: "Transit",
        service: "Révision",
        duration: "2h",
        note: "Attente fournisseur"
    },
];