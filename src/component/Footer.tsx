import {Box, Button, Typography} from "@mui/material";

const Footer = () => {
    return (
        <>
            <Box id="contact" sx={{py: 3, backgroundColor: '#0d47a1', textAlign: 'center', height: '50%'}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Contactez-nous</Typography>
                <Typography variant="h6">27 rue Aristide Briand, Ligueil</Typography>
                <Typography variant="h6">📞 02 36 05 87 87</Typography>
                <Typography variant="h6">🕓 Du lundi au samedi - 8h30 à 18h30</Typography>
                <Box sx={{mt: 4}}>
                    <Button variant="contained" sx={{backgroundColor: '#fff', color: '#0d47a1', mx: 1}}>Site
                        Web</Button>
                    <Button variant="contained"
                            sx={{backgroundColor: '#fff', color: '#0d47a1', mx: 1}}>Facebook</Button>
                </Box>
            </Box>

            <Box sx={{backgroundColor: '#000', textAlign: 'center', py: 3, color: 'gray'}}>
                © 2025 L'Atelier Automobile de Ligueil - Tous droits réservés.
            </Box>
        </>
    )
}
export default Footer;