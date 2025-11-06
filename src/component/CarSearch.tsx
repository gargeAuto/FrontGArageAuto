import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Autocomplete,
    TextField,
    Box,
    Stack,
    Typography,
    Chip,
    Button,
    Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import {styled} from "@mui/system";

import type {
    MakeDto,
    ModelDto,
    YearDto,
    MakeName,
    ModelName,
    YearValue,
    CarSearchProps,
} from "../type/car.ts";

const GRADIENT = "linear-gradient(90deg, #1976d2, #2196f3)";

const StyledAccordion = styled(Accordion)(({theme}) => ({
    backgroundColor: "rgba(15, 15, 15, 0.8)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",

    color: "#fff",
}));

const StyledTextField = styled(TextField)(({theme}) => ({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "rgba(255,255,255,0.3)",
        },
        "&:hover fieldset": {
            borderColor: "#2196f3",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#2196f3",
        },
        color: "#fff",
    },
    "& label": {
        color: "rgba(255,255,255,0.7)",
    },
    "& label.Mui-focused": {
        color: "#2196f3",
    },
    width: 220,
}));

const CarSearch = ({onChangeCar,immat, km, onChangeImmat, onChangeKm, onValidityChange,}: CarSearchProps) => {

    const [makes, setMakes] = useState<MakeDto[]>([]);
    const [models, setModels] = useState<ModelDto[]>([]);
    const [years, setYears] = useState<YearDto[]>([]);
    const [make, setMake] = useState<MakeName | null>(null);
    const [model, setModel] = useState<ModelName | null>(null);
    const [year, setYear] = useState<YearValue | null>(null);
    const [expanded, setExpanded] = useState<boolean>(true);
    const makeOptions = Array.isArray(makes) ? makes.map((m) => m.name) : [];
    const modelOptions = Array.isArray(models) ? models.map((m) => m.name) : [];
    const yearOptions = Array.isArray(years) ? years.map((y) => String(y.years)) : [];
    const handleReset = () => {
        setMake(null);
        setModel(null);
        setYear(null);
        onChangeCar?.({make: null, model: null, year: null, immat: "", km: ""});
        onChangeImmat?.("");
        onChangeKm?.("");
    };


    useEffect(() => {
        onChangeCar?.({make, model, year,immat, km});
    }, [make, model, year, immat,km,onChangeCar]);

    const chips: string[] = [
        immat ? `Immat: ${immat}` : "",
        km ? `Km: ${km}` : "",
        make ?? "",
        model ?? "",
        year != null ? String(year) : "",
    ].filter(Boolean);


    const commitMake = (_: unknown, v: string | null) => setMake(v?.trim() || null);
    const commitModel = (_: unknown, v: string | null) => setModel(v?.trim() || null);
    const commitYear = (_: unknown, v: string | null) => {
        const digits = (v ?? "").replace(/\D/g, "");
        const n = digits ? Number(digits) : NaN;
        setYear(Number.isFinite(n) ? n : null);
    };

    useEffect(() => {
        const isValid =
            make?.trim()!= "" &&
            model?.trim() != "" &&
            year != null &&
            immat.trim() != "" &&
            km.trim() != "";
        onValidityChange?.(isValid);
    },[make, model, year, immat, km]);

    return (
        <StyledAccordion expanded={expanded} elevation={0} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: "#2196f3"}}/>}
                sx={{
                    color: "#fff",
                    "& .MuiAccordionSummary-content": {my: 1, display: "block"},
                }}
            >
                <Stack spacing={1} alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <DirectionsCarFilledIcon sx={{color: "#2196f3"}}/>
                        <Typography variant="h6" fontWeight={700}>
                            Infos véhicule
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                ml: 1,
                                px: 1,
                                py: 0.25,
                                borderRadius: 1,
                                bgcolor: "rgba(255,255,255,.18)",
                            }}
                        >
                            {chips.length > 0 ? "Résumé rempli" : "Aucune info"}
                        </Typography>
                    </Stack>

                    {chips.length > 0 && (
                        <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                            {chips.slice(0, 4).map((c) => (
                                <Chip
                                    key={c}
                                    size="small"
                                    label={c}
                                    sx={{
                                        bgcolor: "rgba(33,150,243,0.15)",
                                        color: "#fff",
                                        borderColor: "#2196f3",
                                    }}
                                    variant="outlined"
                                />
                            ))}
                            {chips.length > 4 && (
                                <Chip
                                    size="small"
                                    label={`+${chips.length - 4}`}
                                    variant="outlined"
                                    sx={{
                                        bgcolor: "rgba(33,150,243,0.15)",
                                        color: "#fff",
                                        borderColor: "#2196f3",
                                    }}
                                />
                            )}
                        </Box>
                    )}
                </Stack>
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    p: {xs: 2, sm: 3},
                    bgcolor: "rgba(0,0,0,0.6)",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <Stack spacing={3} alignItems="center">
                    <Typography variant="h6" fontWeight={700} color="#2196f3">
                        Vos informations principales
                    </Typography>

                    <Stack
                        direction={{xs: "column", sm: "row"}}
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <StyledTextField
                            label="Immatriculation"
                            value={immat}
                            onChange={(e) => onChangeImmat?.(e.target.value)}
                        />
                        <StyledTextField
                            label="Kilométrage"
                            value={km}
                            onChange={(e) => onChangeKm?.(e.target.value)}
                        />
                    </Stack>

                    <Divider flexItem sx={{borderColor: "rgba(255,255,255,0.2)", my: 2}}/>

                    <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
                        <Autocomplete
                            freeSolo
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={makeOptions}
                            value={make ?? ""}
                            onChange={commitMake}
                            onInputChange={(_, v) => setMake(v?.trim() || null)}
                            sx={{width: 250}}
                            renderInput={(p) => (
                                <StyledTextField {...p} label="Marque" placeholder="ex: Peugeot"/>
                            )}
                        />

                        <Autocomplete
                            freeSolo
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={modelOptions}
                            value={model ?? ""}
                            onChange={commitModel}
                            onInputChange={(_, v) => setModel(v?.trim() || null)}
                            sx={{width: 250}}
                            disabled={!make}
                            renderInput={(p) => (
                                <StyledTextField {...p} label="Modèle" placeholder="ex: 308"/>
                            )}
                        />

                        <Autocomplete
                            freeSolo
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={yearOptions}
                            value={year != null ? String(year) : ""}
                            onChange={commitYear}
                            onInputChange={(_, v) => {
                                const digits = (v ?? "").replace(/\\D/g, "");
                                const n = digits ? Number(digits) : NaN;
                                setYear(Number.isFinite(n) ? n : null);
                            }}
                            sx={{width: 200}}
                            disabled={!model}
                            renderInput={(p) => (
                                <StyledTextField {...p} label="Année" placeholder="ex: 2018"/>
                            )}
                        />
                    </Box>

                    <Button
                        onClick={handleReset}
                        variant="outlined"
                        sx={{
                            mt: 2,
                            borderColor: "#2196f3",
                            color: "#2196f3",
                            textTransform: "none",
                            "&:hover": {background: "rgba(33,150,243,0.1)"},
                        }}
                    >
                        Réinitialiser
                    </Button>
                </Stack>
            </AccordionDetails>
        </StyledAccordion>
    );
};

export default CarSearch;
