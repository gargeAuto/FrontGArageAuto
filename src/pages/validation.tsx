
import {Box, Card, CardContent, Stack, Typography, Chip, Button, Divider, Alert} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import {Link as RouterLink, useLocation, useNavigate} from "react-router";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import api from "../api/api.ts";
import {useEffect, useState} from "react";

dayjs.locale("fr");


const SERVICE_LABELS: Record<number, string> = {
    1: "Vidange + Filtre à Huile",
    2: "Pneumatiques",
    3: "Freins",
    4: "Batterie",
    5: "Distribution",
    6: "Amortisseurs",
    7: "Climatisation",
    8: "Diagnostic électronique",
    9: "Géométrie / Parallélisme",
    10: "Filtres air & habitacle",
    11: "Bougies / Préchauffage",
    12: "Embrayage",
};


type SelectionLike = {
    appointment?: { start: string; end: string };
    start?: string;
    end?: string;
    id?: number;
    name?: string;
    codePostal?: string;
    date : string;
    libelleCommune?: string;
    carData?: {
        immat?: string;
        make?: string;
        model?: string;
        year?: number;
    };
    services?: number[];
    selectedStart?: string;
};


const fmt = (iso?: string) => (iso ? dayjs(iso).format("dddd D MMM YYYY • HH:mm") : "—");

const validation = () => {
    const location = useLocation() as { state?: any };
 const [responseApi, setResponseApi] = useState<any>(null);
 const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    let data: SelectionLike | null =
        location?.state?.confirmation ?? location?.state?.selection ?? null;




    const start = data?.selectedStart;
   // const end = data?.appointment?.end ?? data?.date;
    const services = data?.services ?? [];
    const cityLine = [data?.codePostal, data?.libelleCommune].filter(Boolean).join(" ");


           const saved = localStorage.getItem("af.car");
           if (saved) data = JSON.parse(saved);



     const clearAppointmentStorage = async () => {
        try {

            const response = await api.post("/appointments", {
                    carData: data?.carData,
                 selectedStart: data?.selectedStart,
                });
                setResponseApi(response.data.message);
                localStorage.removeItem("ac.selection");
                localStorage.removeItem("ac.account");


        } catch (error) {
            setError((error as Error).message);
        }

    };

    return (
        <Box sx={{height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center"}}>

            <Card sx={{maxWidth: 720, mx: "auto", my: 3, borderRadius: 3, boxShadow: 3, minWidth: 400}}>
                {error && <Alert severity="error">{error}</Alert>}
                <CardContent>
                    <Stack spacing={2}>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <EventAvailableIcon/>
                            <Typography variant="subtitle1" fontWeight={700}>
                                {fmt(data?.selectedStart)}
                            </Typography>
                        </Stack>

                        <Divider/>

                        <Stack spacing={0.5}>
                            <Typography variant="h6">L'Atelier Automobile de Ligueil</Typography>
                            {cityLine && (
                                <Typography variant="body2" sx={{opacity: 0.9}}>
                                    L'Atelier Automobile de Ligueil
                                </Typography>
                            )}
                        </Stack>

                        <Divider/>

                        <Stack spacing={0.5}>
                            <Typography variant="overline" sx={{opacity: 0.8}}>
                                Véhicule
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <DirectionsCarFilledIcon/>
                                <Typography>
                                    <strong>
                                        {(data?.carData?.make ?? "")} {(data?.carData?.model ?? "")} {data?.carData?.year ? `• ${data.carData.year}` : ""}
                                    </strong>
                                </Typography>
                            </Stack>
                            <Typography variant="body2" sx={{opacity: 0.9}}>
                                {data?.carData?.immat ? `Immat : ${data.carData.immat.toUpperCase()}` : "Immat : —"}
                            </Typography>
                        </Stack>

                        {services.length > 0 && (
                            <>
                                <Divider/>
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {services.map((s) => (
                                        <Chip key={s} label={SERVICE_LABELS[s] ?? `Service #${s}`}/>
                                    ))}
                                </Stack>
                            </>
                        )}
                        {responseApi && <Alert>{responseApi}</Alert>}
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{pt: 1}}>
                            {
                              !responseApi ? <Button
                                    variant="contained"
                                    onClick={clearAppointmentStorage}
                                >
                                    valider
                                </Button> : <Button
                                  variant="contained"
                                  onClick={() => navigate("/")}
                              >
                                  page d acceuil
                              </Button>
                            }
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>


    );
};

export default validation;