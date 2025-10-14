import React, {useState, useEffect} from 'react';
import {AppBar, Toolbar, Typography, Box, Button, Container} from '@mui/material';
import {styled} from '@mui/system';
import pictureCar from '../assets/pictureCar.png';
import logoNavbard from '../assets/logoNavbard.jpg';
import {useNavigate} from "react-router-dom";


const HeroSection = styled(Box)(({theme}) => ({
    height: '70vh',
    width: "100vw",
    backgroundImage: `url(${pictureCar})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    }
}));

const HeroContent = styled(Box)(({theme}) => ({
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    textShadow: '0 0 20px rgba(0,0,0,0.8)',
}));

const CustomAppBar = styled(AppBar)(({scrolled}) => ({
    backgroundColor: scrolled ? 'rgba(0,0,0)' : 'rgba(0,0,0,0)',
    boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0)' : 'none',
    transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
    backdropFilter: 'none !important', // 👈 retire tout flou
    WebkitBackdropFilter: 'none !important'
}));

export default function AtelierAuto() {

    const [scrolled, setScrolled] = useState(false);
    const [bgBlack, setBgBlack] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);
            setBgBlack(scrollY > window.innerHeight - 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box sx={{
            backgroundColor: bgBlack ? '#000' : 'transparent',
            transition: 'background-color 1s ease',
            minHeight: '100vh',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
        }}>
            <CustomAppBar position="fixed" scrolled={scrolled ? 1 : 0}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Box
                                component="img"
                                src={logoNavbard}
                                alt="logo"
                                sx={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: "50%",
                                    objectFit: "contain",
                                    backgroundColor: "transparent",
                                    border: "2px solid rgba(255,255,255,0.3)",
                                    boxShadow: "0 0 10px rgba(255,255,255,0.2)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 0 15px rgba(255,255,255,0.5)",
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                    color: "white",
                                    textShadow: "0 0 10px rgba(0,0,0,0.6)",
                                    letterSpacing: 0.5,
                                }}
                            >
                                L'Atelier Automobile de Ligueil
                            </Typography>
                        </Box>
                    <Box>
                        <Button color="inherit" href="#services">Services</Button>
                        <Button color="inherit" href="#contact">Contact</Button>
                    </Box>
                </Toolbar>
            </CustomAppBar>

            <HeroSection>
                <HeroContent>
                    <Typography variant="h2" fontWeight="bold" gutterBottom>Votre garage de confiance à
                        Ligueil</Typography>
                    <Typography variant="h5" gutterBottom>Achat, réparation, entretien et esthétique
                        automobile</Typography>
                    <Button variant="contained" color="primary" size="large" sx={{mt: 3}}
                            onClick={() => navigate("/select-car")} >Prendre rendez-vous</Button>
                </HeroContent>
            </HeroSection>

            <Box id="services" sx={{py: 10, background: 'linear-gradient(to bottom, #000, #111)', textAlign: 'center'}}>
                <Typography variant="h3" color="primary" gutterBottom>Nos Services</Typography>
                <Container
                    sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 4, mt: 6}}>
                    {[{
                        title: 'Achat - Revente',
                        text: 'Véhicules révisés, garantis, démarches simplifiées et conseils personnalisés.'
                    }, {
                        title: 'Entretien & Réparation',
                        text: 'Vidange, freins, suspensions, diagnostic électronique complet, et plus encore.'
                    }, {
                        title: 'Nettoyage & Esthétique',
                        text: 'Intérieur et extérieur, lavage, rénovation des optiques, cire et protection carrosserie.'
                    }, {
                        title: 'Service Pneumatiques',
                        text: 'Vente et montage de pneus neufs et d’occasion, équilibrage et géométrie.'
                    }].map((service, index) => (
                        <Box key={index} sx={{
                            backgroundColor: '#1c1c1c',
                            borderRadius: 3,
                            p: 4,
                            boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                            '&:hover': {boxShadow: '0 0 20px #2196f3'}
                        }}>
                            <Typography variant="h5" color="primary" gutterBottom>{service.title}</Typography>
                            <Typography variant="body1" color="gray.300">{service.text}</Typography>
                        </Box>
                    ))}
                </Container>
            </Box>

            <Box id="contact" sx={{py: 10, backgroundColor: '#0d47a1', textAlign: 'center'}}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>Contactez-nous</Typography>
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
        </Box>
    );
}
