import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import {styled} from '@mui/system';
import pictureCar from '../assets/pictureCar.png';
import {useNavigate} from "react-router-dom";


const HeroSection = styled(Box)(({theme}) => ({
    height: '70vh',
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



export default function AtelierAuto() {

    const navigate = useNavigate();


    return (
        <Box >
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
        </Box>
    );
}
