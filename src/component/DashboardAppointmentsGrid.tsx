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
            field: "start",
            headerName: "Heure",
            width: 110,
            valueGetter: (params) => {
                const d = params.value ? new Date(params.row.selectedStart) : null;
                return d ? d.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}) : "-";
            },
        },
        {field: "clientName", headerName: "Client", width: 160},
        {field: "vehicle", headerName: "Véhicule", width: 140},
        {
            field: "service",
            headerName: "Service",
            width: 140,
            renderCell: (params) => <Chip label={params.value || "—"} color="primary" variant="outlined" size="small"/>,
        },
        {
            field: "duration",
            headerName: "Durée",
            width: 100,
            renderCell: (params) => <Chip label={params.value || "30m"} color="secondary" size="small"/>,
        },
        {field: "note", headerName: "Note", width: 180},
    ];

    return (
        <Box sx={{display: "flex", flexDirection: "column" , alignItems: "center", mb: 2, mt:"60px"}}>
            <Stack sx={{display: "flex", flexDirection: "row", alignItems: "center", mb: 2}}>
                <Typography variant="h5">Rendez-vous aujourd'hui</Typography>
                <Stack >
                    <Chip label={`${rows.length} résultats`} variant="outlined"/>
                </Stack>
            </Stack>

            <Paper sx={{height: 480, borderRadius: 3, overflow: "hidden", boxShadow: 2}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(r) => r.id}
                    sx={{border: "none"}}
                    initialState={{pagination: {paginationModel: {pageSize: 8}}}}
                    pageSizeOptions={[5, 8, 12, 24]}
                />
            </Paper>
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