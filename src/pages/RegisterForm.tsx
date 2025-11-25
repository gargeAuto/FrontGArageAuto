import {useContext, useEffect, useState} from "react";
import {Card, CardHeader, CardContent, Stack, TextField, Button, Typography, Alert, Link, Box} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {Link as RouterLink, useLocation} from "react-router";
import axios from "axios";
import type {CustomerRegisterPayload as RegisterPayload} from "../../types/login";
import api from "../api/api.ts";
import {useNavigate} from "react-router-dom";
import {UserContexte} from "../AllContexte/UserContexte.tsx";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterFormProps = {
    onSuccess?: () => void;
    registerFn?: (data: RegisterPayload) => Promise<void>;
};

const RegisterForm = ({onSuccess, registerFn}: RegisterFormProps) => {
    const [form, setForm] = useState<RegisterPayload>({
        email: null,
        name: null,
        surname: null,
        phone: null,
        password: "",
        password_confirmation: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null | boolean >(null);
    const [inputsError, setInputsError] = useState({
        email: null,
        password: "",
        name: null,
        surname: null,
        phone: null,
    });
    const [responseData, setResponseData] = useState(null);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const {isLogUser, setIsLogUser} = useContext(UserContexte);

    const canSubmit =
        emailRegex.test(form.email) &&
        form.password.trim().length >= 6 &&
        form.password_confirmation.trim() == form.password.trim() &&
        form.name.trim().length >= 2 &&
        form.surname.trim().length >= 2 &&
        form.phone.trim().length >= 6 &&
        !loading;

    useEffect(() => {
        if (isLogUser) {
            navigate(from, {replace: true});
        }

    }, [isLogUser]);

    function update<K extends keyof RegisterPayload>(key: K) {
        return (e) =>
            setForm((prev: RegisterPayload) => ({...prev, [key]: e.target.value}));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!canSubmit) return;

        setError(null);
        setLoading(true);
        try {
           const response = await  api.post("/signup", form);
           console.log(response.data.message);
           setResponseData(response.data.message);

        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    function validateField(
        key: keyof RegisterPayload,
        value: string
    ): string | null {
        switch (key) {
            case "email":
                return emailRegex.test(value) ? null : "Email invalide";
            case "password":
                if (value.trim().length < 6) {
                    return "Mot de passe trop court (min 6 caractères)";
                }
                if (!/[A-Z]/.test(value)) {
                    return "Le mot de passe doit contenir au moins une majuscule";
                }
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                    return "Le mot de passe doit contenir au moins un caractère spécial";
                }
                return null;
            case "surname":
                return value.trim().length >= 2 ? null : "Champ requis";
            case "phone":
                return value.trim().length >= 6 ? null : "Téléphone invalide";
            default:
                return null;
        }
    }

    const handleBlur = (key: keyof RegisterPayload) => {
        return () => {
            const errorMsg = validateField(key, form[key]);
            setInputsError((prev) => ({
                ...prev,
                [key]: errorMsg,
            }));
        };
    };

    return (
        <Box sx={{width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh" }}>

            <Card
                sx={{
                    width: "100%",
                    maxWidth: 560,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 10px 28px rgba(0,0,0,.10)",
                    m: 20  ,
                    maxHeight: 650,
                }}
            >
                <CardHeader
                    avatar={<PersonAddAlt1Icon sx={{color: "white"}}/>}
                    title={<Typography variant="h6" fontWeight={800}>Créer un compte</Typography>}
                    subheader={
                        <Typography variant="caption" sx={{color: "rgba(255,255,255,.9)"}}>
                            Renseignez vos informations pour continuer
                        </Typography>
                    }
                    sx={{color: "white", "& .MuiCardHeader-title": {fontWeight: 800}}}
                />

                <CardContent sx={{p: 3}}>
                    <form onSubmit={handleSubmit} noValidate>
                        <Stack spacing={2}>
                            {error && <Alert severity="error">{error}</Alert>}

                            <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                                <TextField label="Prénom" value={form.name} onChange={update("name")} required
                                           fullWidth/>
                                <TextField label="Nom" value={form.surname} onChange={update("surname")} required
                                           fullWidth/>
                            </Stack>

                            <TextField
                                label="Téléphone"
                                value={form.phone}
                                onChange={update("phone")}
                                type="tel"
                                autoComplete="tel"
                                required
                                fullWidth
                                slotProps={{
                                    input: {
                                        inputProps: {
                                            maxLength: 20,
                                            inputMode: "tel",
                                            pattern: "[0-9+ ]*"
                                        }
                                    }
                                }}
                            />

                            <TextField label="Email" value={form.email} onChange={update("email")} type="email"
                                       autoComplete="email"
                                       required
                                       fullWidth
                                       onBlur={handleBlur("email")}
                                       error={!!inputsError.email }
                                       helperText={inputsError.email || ""}
                                       />

                            <TextField
                                label="Mot de passe"
                                value={form.password}
                                onChange={update("password")}
                                onBlur={handleBlur("password")}
                                error={!!inputsError.password}
                                helperText={inputsError.password || "6 caractères minimum"}
                                type="password"
                                autoComplete="new-password"
                                required
                                fullWidth

                            />
                            <TextField
                                label="comfirmation du mot de passe"
                                value={form.password_confirmation}
                                onChange={update("password_confirmation")}
                                //onBlur={handleBlur("password")}
                                //error={!!inputsError.password}
                               // helperText={inputsError.password || "6 caractères minimum"}
                                type="password"
                                autoComplete="new-password"
                                required
                                fullWidth

                            />
                            {responseData && <Alert>{responseData}</Alert>}

                            <Button type="submit" variant="contained" disabled={!canSubmit}
                                    sx={{textTransform: "none", py: 1.1, borderRadius: 2}}>
                                {loading ? "Création..." : "S'inscrire"}
                            </Button>

                            <Typography variant="body2" sx={{textAlign: "center", opacity: 0.85}}>
                                Déjà un compte ?{" "}
                                <Link component={RouterLink} to="/Login-Form" underline="hover">
                                    Se connecter
                                </Link>
                            </Typography>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Box>

    );
};

export default RegisterForm;
