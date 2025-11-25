import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Typography, CircularProgress, Alert, Container, Card, CardContent} from "@mui/material";
import api from "../api/api.ts"; // ton axios configuré

export default function EmailValidation() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const signedUrl = params.get("url");
        const expires = params.get("expires");       // "ABC123"
        const signature = params.get("signature");
        const id = params.get("id");


        if (!signedUrl) {
            setError("Token manquant dans l'URL.");
            setLoading(false);
            return;
        }

        // Appel API pour valider le token
        const validateEmail = async () => {
            try {
                const response = await api.get(signedUrl.replace("http://localhost", "").replace("/api", ""));
                localStorage.setItem("af.account", response.data.token);
                setMessage(response.data.message || "Adresse e-mail validée avec succès !");
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || "Une erreur est survenue.");
            } finally {
                setLoading(false);
            }
        };

        validateEmail();
    }, [location]);

    useEffect(() => {
        // Redirection automatique après succès
        if (message) {
            const timer = setTimeout(() => {
                navigate("/", {replace: true});
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate]);

    return (
        <Container maxWidth="sm" sx={{mt: 12}}>
            <Card>
                <CardContent sx={{textAlign: "center"}}>
                    {loading && (
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
                            <CircularProgress/>
                            <Typography variant="body1">Validation en cours...</Typography>
                        </Box>
                    )}
                    {!loading && message && <Alert severity="success">{message}</Alert>}
                    {!loading && error && <Alert severity="error">{error}</Alert>}
                    {!loading && (message || error) && (
                        <Typography variant="body2" sx={{mt: 2}}>
                            {message ? "Redirection automatique dans 3 secondes..." : ""}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}
