import {useContext, useMemo, useState} from "react";
import {Alert, Box, Button, Card, CardContent, CardHeader, styled, Typography, useMediaQuery,} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import dayjs, {Dayjs} from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/fr";
import {useNavigate} from "react-router-dom";
import {UserContexte} from "../AllContexte/UserContexte.tsx";
import type {CarSelection} from "../type/car.ts";

dayjs.locale("fr");
dayjs.extend(customParseFormat);

export type Slot = { start: string; end: string };

type Props = {
    stepMin?: number;
    disabledTimes?: Appointment[];
    getHoursForDate?: (date: Dayjs) => {
        openingHour: number;
        closingHour: number;
    } | null;
    isCarValid?:(valid: boolean) => void;
    setCarLocalStorage: CarSelection;

};

const GRADIENT = "linear-gradient(90deg, #1976d2, #2196f3)";
const SLOT_FMT = "YYYY-MM-DD[T]HH:mm";

const StyledCard = styled(Card)(() => ({
    background: "rgba(15,15,15,0.85)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "20px",
    color: "#fff",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
    width: "100%",
    maxWidth: 650,
    mx: "auto",
    maxHeight: "800px",


}));

const StyledButton = styled(Button)(() => ({
    borderColor: "rgba(33,150,243,0.5)",
    color: "#2196f3",
    textTransform: "none",
    fontWeight: 600,
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: "rgba(33,150,243,0.15)",
        borderColor: "#2196f3",
    },
    "&.Mui-disabled": {
        color: "rgba(255,255,255,0.3)",
        borderColor: "rgba(255,255,255,0.1)",
    },
}));

const BookingCalendar = ({stepMin = 30,
                             getHoursForDate,
                             disabledTimes = [],
                             isCarValid,
                             setCarLocalStorage,
                         }: Props) => {
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [selectedStart, setSelectedStart] = useState<string | null>(null);
    const {isLogUser, setIsLogUser} = useContext(UserContexte);
    const [error, setError] = useState<string | null>(null);
    const [ChoiseSlote, setChoiseSlote] = useState<Slot | null>(null);
    const navigate = useNavigate();


    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    const toLocalIso = (d: dayjs.Dayjs) =>
        d.second(0).millisecond(0).format(SLOT_FMT);

    const disabledTimesNormalized = useMemo(() => {
        const out: string[] = [];
        disabledTimes?.forEach((appt) => {
            const start = dayjs(appt.startDate);
            const end = dayjs(appt.endDate);
            let current = start;
            while (current.isBefore(end)) {
                out.push(current.format(SLOT_FMT));
                current = current.add(stepMin, "minute");
            }
        });
        return out;
    }, [disabledTimes, stepMin]);

    const hours = date && getHoursForDate ? getHoursForDate(date) : null;

    const slots = useMemo(() => {
        if (!date || !hours) return [];
        const out: Slot[] = [];
        const d = date.startOf("day");
        for (let h = hours.openingHour; h < hours.closingHour; h++) {
            for (let m = 0; m < 60; m += stepMin) {
                const start = d.hour(h).minute(m);
                const end = start.add(stepMin, "minute");
                out.push({start: toLocalIso(start), end: toLocalIso(end)});
            }
        }
        return out;
    }, [date, hours, stepMin]);

    const isDisabled = (startLocal: string) =>
        disabledTimesNormalized.includes(startLocal) ||
        dayjs(startLocal, SLOT_FMT, true).isBefore(dayjs());

    const subtitle = date
        ? date.format("dddd D MMMM YYYY").replace(/^\w/, (c) => c.toUpperCase())
        : "";




        const handleSaveCarLocalStorage = () => {
            if (!isCarValid) {
                setError("Veuillez remplir tous les champs");
                return false;
            }

            if (!ChoiseSlote) {
                setError("Veuillez choisir une date");
                return false;
            }

            const car = {carData: setCarLocalStorage, date}; // pas besoin de double tableau
            localStorage.setItem("af.car", JSON.stringify(car));
            setError(null);
            return true;
        };



    return (
        <StyledCard>
            <CardHeader
                avatar={<EventAvailableIcon sx={{color: "#2196f3"}}/>}
                title={
                    <Typography variant="h6" fontWeight={800}>
                        Prendre rendez-vous
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" sx={{color: "rgba(255,255,255,.7)"}}>
                        {subtitle}
                    </Typography>
                }
                sx={{
                    background: "rgba(0,0,0,0.5)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
            />

            <CardContent sx={{p: {xs: 2, sm: 3}}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {xs: "column", md: "row"},
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: 3,
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr" sx={{ display: "flex", alignItems: "center"}}>
                        <DateCalendar
                            value={date}
                            onChange={(d) => {
                                setDate(d);
                                setSelectedStart(null);
                            }}
                            sx={{
                                background: "rgba(255,255,255,0.03)",
                                borderRadius: 3,
                                "& .MuiPickersDay-root": {color: "white"},
                                "& .MuiPickersDay-root.Mui-selected": {
                                    background: "#2196f3",
                                    color: "#fff",
                                },
                                "& .MuiPickersDay-today": {borderColor: "#2196f3"},
                            }}
                        />
                    </LocalizationProvider>
                        <Box
                            sx={{
                                width: {xs: "100%", md: "60%"},
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "repeat(2, 1fr)",
                                    sm: "repeat(3, 1fr)",
                                    md: "repeat(4, 1fr)",
                                },
                                gap: 1,
                            }}
                        >
                            {slots.map((s) => {
                                const start = dayjs(s.start, SLOT_FMT, true);
                                const label = start.format("HH:mm");
                                const disabled = isDisabled(s.start);
                                const selected = selectedStart === s.start;
                                return (
                                    <StyledButton
                                        key={s.start}
                                        variant={selected ? "contained" : "outlined"}
                                        onClick={() => {
                                            setSelectedStart(s.start);
                                            setChoiseSlote(s)
                                        }}
                                        disabled={disabled}
                                        sx={{
                                            background: selected ? GRADIENT : "transparent",
                                            color: selected ? "#fff" : "#2196f3",
                                            borderColor: selected ? "transparent" : "rgba(33,150,243,0.5)",
                                        }}
                                        size={isXs ? "small" : "medium"}
                                    >
                                        {label}
                                    </StyledButton>

                                );
                            })}

                    </Box>
                </Box>
                <Box sx={{width: "100%", textAlign: "center"}}>

                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        onClick={() => {
                            const validate = handleSaveCarLocalStorage();
                            if(validate){
                                navigate("/Validation")
                            }
                        }}

                        variant="contained"
                        sx={{
                            mt: 3,
                            px: 5,
                            py: 1.5,
                            background: GRADIENT,
                            fontWeight: 700,
                            color: "#fff",
                            borderRadius: "10px",
                            "&:hover": {
                                background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                            },
                        }}
                    >
                        Finaliser
                    </Button>
                </Box>
            </CardContent>

        </StyledCard>
    );
};

export default BookingCalendar;
