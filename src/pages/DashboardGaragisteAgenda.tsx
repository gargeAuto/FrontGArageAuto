import {useState, useEffect, useMemo} from "react";
import {
    Container, Box, Typography, Chip, Stack,
    Button, Dialog, DialogTitle, DialogContent,
    DialogActions, Alert, Autocomplete, TextField,
    Checkbox, Avatar
} from "@mui/material";

import GarageCalendarView from "../component/GarageCalendarView";
import api from "../api";
import dayjs from "dayjs";


const DashboardGaragisteAgenda = () => {

    const [appointments, setAppointments] = useState<any[]>([]);
    const [technicians, setTechnicians] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [selectedTechsEvent, setSelectedTechsEvent] = useState<number[]>([]);
    const [selectedTechIds, setSelectedTechIds] = useState<number[]>([]);
    const [currentRange, setCurrentRange] = useState<{ start: string, end: string } | null>(null);


    const getTechId = (t: any) => {
        const tries = [t.id, t.engineer_id, t.user_id];
        for (const v of tries) {
            const n = Number(v);
            if (!isNaN(n)) return n;
        }
        return null;
    };

    const getTechLabel = (t: any, id: number | null) => {
        const name = `${t.name ?? ""} ${t.surname ?? ""}`.trim();
        if (name) return name;
        return id ? `Technicien #${id}` : "Technicien";
    };

    const colorForId = (id: number) => {
        const colors = ["#1976d2", "#9c27b0", "#ff9800", "#2e7d32", "#ef5350"];
        return colors[id % colors.length];
    };


    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const resTech = await api.get("/getTechniciens");

                setTechnicians(resTech.data?.data ?? []);
            } catch (e: any) {
                setError(e.message || "Erreur inconnue");
            }
            setLoading(false);
        };
        load();
    }, []);

    const fetchAppointments = async (start: string, end: string) => {

        // Empêche les appels répétés pour la même période
        if (currentRange && currentRange.start === start && currentRange.end === end) {
            return;
        }

        setCurrentRange({start, end});

        try {
            const res = await api.get("/appointments", {
                params: {start, end}
            });
            setAppointments(res.data?? []);
        } catch (e) {
            setError("Impossible de charger les rendez-vous");
        }
    };



    const techOptions = useMemo(() => {
        return technicians
            .map((t: any) => {
                const id = getTechId(t);
                if (!id) return null;
                return {
                    id,
                    label: getTechLabel(t, id),
                    color: colorForId(id),
                    _raw: t
                };
            })
            .filter(Boolean);
    }, [technicians]);

    const techById = useMemo(() => {
        const map = new Map<number, { label: string; color: string }>();
        techOptions.forEach((o: any) => map.set(o.id, {label: o.label, color: o.color}));
        return map;
    }, [techOptions]);


    useEffect(() => {
        if (!appointments.length) return;

        const evts = appointments.map((a: any) => {
            const techs = a.technicians || [];
            let techIds = techs.map((t: any) => getTechId(t)).filter(Boolean);
            let techNames = techs.map((t: any) => getTechLabel(t, getTechId(t)));

            if (techIds.length === 0) {
                techIds = [0];
                techNames = ["Non assigné"];
            }

            // --- CORRECTION 1 : Formatage des dates ---
            // On remplace l'espace SQL par un T, ou on utilise dayjs().format() (ISO par défaut)
            const start = dayjs(a.selectedStart).isValid()
                ? dayjs(a.selectedStart).format() // Génère "2025-11-13T10:00:00+01:00"
                : a.selectedStart.replace(" ", "T");

            const end = a.selectedEnd
                ? dayjs(a.selectedEnd).format()
                : dayjs(a.selectedStart).add(1, "hour").format();

            // --- CORRECTION 2 : Titre de secours ---
            // Si pas de nom, on affiche le service ou "Client #ID"
            const customerLabel = (a.customerName || a.customerSurname)
                ? `${a.customerName ?? ""} ${a.customerSurname ?? ""}`
                : `Client #${a.customer_id} - ${a.service}`;

            return {
                id: String(a.id),
                title: customerLabel, // On utilise le label sécurisé
                start,
                end,
                extendedProps: {
                    appointmentId: a.id,
                    techIds,
                    techNames,
                    customerName: a.customerName,
                    customerSurname: a.customerSurname,
                    service: a.service,
                },
                // Si le JSON ne renvoie pas de techniciens, techIds vaut [0], donc couleur par défaut
                backgroundColor:
                    techIds.length === 1 && techIds[0] !== 0
                        ? techById.get(techIds[0])?.color ?? "#1976d2"
                        : "#888" // Gris si non assigné
            };
        });

        setCalendarEvents(evts);
    }, [appointments, techById]);



    const eventsToShow = useMemo(() => {
        if (!selectedTechIds.length) return calendarEvents;
        const wanted = new Set(selectedTechIds);

        return calendarEvents.filter((ev) => {
            const ext = ev.extendedProps || {};
            return (ext.techIds || []).some((t: number) => wanted.has(t));
        });

    }, [calendarEvents, selectedTechIds]);



    const openDialogFromEvent = (ev: any) => {
        const ext = ev.extendedProps;

        setSelectedEvent({
            id: ev.id,
            start: ev.startStr,
            end: ev.endStr,
            customerName: ext.customerName,
            customerSurname: ext.customerSurname,
            techIds: ext.techIds || [],
            techNames: ext.techNames || [],
            service: ext.service
        });

        setSelectedTechsEvent(ext.techIds || []);
    };



    const handleSaveEventTechs = async () => {
        if (!selectedEvent) return;

        const techIds = selectedTechsEvent;

        try {
            await api.put(`/appointments/${selectedEvent.id}/assign`, {
                technicians: techIds
            });
        } catch (e) {
            alert("Erreur lors de la mise à jour");
            return;
        }


        setCalendarEvents((prev) =>
            prev.map((ev) => {
                if (ev.id !== selectedEvent.id) return ev;
                return {
                    ...ev,
                    extendedProps: {
                        ...ev.extendedProps,
                        techIds,
                        techNames: techIds.map((id) => techById.get(id)?.label ?? `#${id}`)
                    }
                };
            })
        );

        setSelectedEvent(null);
    };

    return (
        <>
            <Container maxWidth="lg" sx={{pb: 4}}>
                <Typography variant="h5" textAlign="center" mt={2}>
                    Planning du garage
                </Typography>

                {error && <Alert severity="error" sx={{mt: 2}}>{error}</Alert>}
                {loading && <Typography>Chargement…</Typography>}

                <GarageCalendarView
                    events={eventsToShow}
                    selectedTechIds={selectedTechIds}
                    setSelectedTechIds={setSelectedTechIds}
                    techOptions={techOptions}
                    techById={techById}
                    onEventClick={openDialogFromEvent}
                    fetchAppointments={fetchAppointments}
                    onEventDidMount={() => {}}
                />
            </Container>

            <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
                <DialogTitle>Modifier le technicien</DialogTitle>
                <DialogContent dividers>
                    {selectedEvent && (
                        <>
                            <Typography>
                                Client : {selectedEvent.customerName} {selectedEvent.customerSurname}
                            </Typography>

                            <Typography variant="body2" sx={{mt: 1, mb: 2}}>
                                Service : {selectedEvent.service}
                            </Typography>

                            <Autocomplete
                                multiple
                                disableCloseOnSelect
                                options={techOptions}
                                value={techOptions.filter((o: any) => selectedTechsEvent.includes(o.id))}
                                onChange={(_, newValue) =>
                                    setSelectedTechsEvent(newValue.map((o: any) => o.id))
                                }
                                getOptionLabel={(opt: any) => opt.label}
                                renderInput={(params) =>
                                    <TextField {...params} placeholder="Choisir technicien" size="small"/>}
                                renderOption={(props, option, {selected}) => (
                                    <li {...props}>
                                        <Checkbox checked={selected}/>
                                        <Avatar sx={{bgcolor: option.color, mr: 1}}>
                                            {option.label.slice(0, 1).toUpperCase()}
                                        </Avatar>
                                        {option.label}
                                    </li>
                                )}
                            />
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setSelectedEvent(null)}>Annuler</Button>
                    <Button variant="contained" onClick={handleSaveEventTechs}>
                        Enregistrer
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    );
};

export default DashboardGaragisteAgenda;
