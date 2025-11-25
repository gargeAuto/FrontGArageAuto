import {
    Box,
    Stack,
    Select,
    MenuItem,
    Checkbox,
    Avatar,
    Typography,
    OutlinedInput,
    Button,
    AvatarGroup,
    useTheme
} from "@mui/material";

// Icônes
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import type {EventInput, EventClickArg, EventMountArg} from "@fullcalendar/core";
// Assurez-vous que ce fichier existe dans le même dossier !
import StyledCalendarWrapper from "./StyledCalendarWrapper";

type GarageCalendarViewProps = {
    events: EventInput[],
    selectedTechIds: number[],
    setSelectedTechIds: (ids: number[]) => void,
    techOptions: { id: number; label: string; color: string }[],
    techById: Map<number, { label: string; color: string }>,
    onEventClick: (arg: EventClickArg) => void,
    onEventDidMount: (arg: EventMountArg) => void,
    fetchAppointments: (start: string, end: string) => void, // Correction du type ici
};

const GarageCalendarView = ({
                                events,
                                selectedTechIds,
                                setSelectedTechIds,
                                techOptions,
                                techById,
                                onEventClick,
                                onEventDidMount,
                                fetchAppointments
                            }: GarageCalendarViewProps) => {

    const theme = useTheme();

    // Fonction de rendu personnalisé pour l'événement (La "Carte")
    const renderEventContent = (arg: any) => {
        const {event} = arg;
        // On sécurise l'accès aux props étendues
        const techNames = event.extendedProps?.techNames || [];
        const techIds = event.extendedProps?.techIds || [];
        const service = event.extendedProps?.service || "";

        // Couleur de base (celle du premier tech ou gris)
        const mainColor = event.backgroundColor || theme.palette.primary.main;

        return (
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderLeft: `6px solid ${mainColor}`,
                    borderRadius: '8px',
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden'
                }}
            >
                {/* En-tête : Heure et Titre */}
                <Box>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{opacity: 0.7, mb: 0.5}}>
                        <AccessTimeIcon sx={{fontSize: 12}}/>
                        <Typography variant="caption" fontWeight="bold">
                            {arg.timeText}
                        </Typography>
                    </Stack>

                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 'bold',
                            lineHeight: 1.2,
                            fontSize: '0.80rem',
                            color: 'text.primary',
                            mb: 0.5
                        }}
                    >
                        {event.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" display="block" noWrap>
                        {service}
                    </Typography>
                </Box>

                {/* Pied de carte : Techniciens */}
                <Box sx={{mt: 'auto', pt: 0.5}}>
                    <AvatarGroup max={3} sx={{
                        justifyContent: 'flex-end',
                        '& .MuiAvatar-root': {width: 20, height: 20, fontSize: 10}
                    }}>
                        {techIds.map((id: number, index: number) => {
                            const techInfo = techById.get(id);
                            return (
                                <Avatar
                                    key={index}
                                    sx={{bgcolor: techInfo?.color || '#ccc'}}
                                    alt={techNames[index] || "?"}
                                >
                                    {techInfo?.label?.charAt(0) || '?'}
                                </Avatar>
                            )
                        })}
                    </AvatarGroup>
                </Box>
            </Box>
        );
    };

    return (
        <Stack spacing={2} sx={{mt: 2}}>

            {/* --- ZONE DE FILTRES (Je l'ai remise complètement) --- */}
            <Box
                sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    boxShadow: 1
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Select
                        multiple
                        size="small"
                        displayEmpty
                        input={<OutlinedInput/>}
                        value={selectedTechIds}
                        onChange={(e) => setSelectedTechIds(e.target.value as number[])}
                        renderValue={(selected) =>
                            selected.length === 0
                                ? "Filtrer par technicien…"
                                : selected
                                    .map((id) => techById.get(id)?.label ?? `#${id}`)
                                    .join(", ")
                        }
                        sx={{
                            minWidth: 260,
                            borderRadius: 2,
                            ".MuiOutlinedInput-notchedOutline": {borderColor: "divider"}
                        }}
                    >
                        {techOptions.map((opt) => (
                            <MenuItem key={opt.id} value={opt.id}>
                                <Checkbox checked={selectedTechIds.includes(opt.id)} sx={{mr: 1}}/>
                                <Avatar
                                    sx={{
                                        width: 24, height: 24,
                                        bgcolor: opt.color, fontSize: 12, mr: 1
                                    }}
                                >
                                    {opt.label.slice(0, 1).toUpperCase()}
                                </Avatar>
                                <Typography>{opt.label}</Typography>
                            </MenuItem>
                        ))}
                        {techOptions.length === 0 && (
                            <MenuItem disabled value="">(Aucun technicien)</MenuItem>
                        )}
                    </Select>

                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained" size="small"
                            onClick={() => setSelectedTechIds(techOptions.map((o) => o.id))}
                            disabled={!techOptions.length}
                            sx={{borderRadius: 2}}
                        >
                            Tout
                        </Button>
                        <Button
                            variant="outlined" size="small"
                            onClick={() => setSelectedTechIds([])}
                            disabled={!selectedTechIds.length}
                            sx={{borderRadius: 2}}
                        >
                            Aucun
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            {/* --- ZONE CALENDRIER --- */}
            <Box
                sx={{
                    p: 0,
                    borderRadius: 4,
                    border: "1px solid",
                    bgcolor:"primary",
                    boxShadow: 3,
                    overflow: 'hidden'
                }}
            >
                <StyledCalendarWrapper>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        locale="fr"
                        buttonText={{today: "Aujourd’hui", month: "Mois", week: "Semaine", day: "Jour"}}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        events={events}
                        eventClick={onEventClick}
                        eventDidMount={onEventDidMount}

                        expandRows
                        nowIndicator
                        dayMaxEventRows={3}
                        height="auto"
                        contentHeight="auto"
                        slotLabelContent={(arg) => {
                            return (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'primary.main', // Exemple : couleur primaire
                                        fontWeight: 'bold',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {arg.text} {/* Affiche l'heure (ex: 07:00) */}
                                </Typography>
                            );
                        }}

                        // Astuce : Vous pouvez aussi changer le format de l'heure ici
                        slotLabelFormat={{
                            hour: '2-digit',
                            minute: '2-digit',
                            omitZeroMinute: false,
                            meridiem: false
                        }}

                        slotDuration="00:30:00"
                        slotLabelInterval="00:30"
                        slotMinTime="07:00:00"
                        slotMaxTime="20:00:00"
                        hiddenDays={[0]} // Cache le dimanche si besoin
                        allDaySlot={false}

                        // Rendu Personnalisé
                        eventContent={renderEventContent}

                        // Important : Initialiser sur la date des données pour tester
                        initialDate="2025-11-13"

                        datesSet={(range) => {
                            // CORRECTION : On convertit en String AVANT d'envoyer
                            const startISO = range.start.toISOString().slice(0, 10);
                            const endISO = range.end.toISOString().slice(0, 10);

                            // On passe bien les chaînes de caractères (strings)
                            fetchAppointments(startISO, endISO);
                        }}
                    />
                </StyledCalendarWrapper>
            </Box>
        </Stack>
    );
};

export default GarageCalendarView;