import React, {useEffect, useState} from 'react';

import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import logoNavbard from "../assets/logoNavbard.jpg";
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";

const CustomAppBar = styled(AppBar)(({scrolled}) => ({
    backgroundColor: scrolled ? 'rgba(0,0,0)' : 'rgba(0,0,0,0)',
    boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0)' : 'none',
    transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
    backdropFilter: 'none !important', // 👈 retire tout flou
    WebkitBackdropFilter: 'none !important'
}));

const NavBard = () => {
    const navigate = useNavigate();
        const [scrolled, setScrolled] = useState(false);
        const [bgBlack, setBgBlack] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                const scrollY = window.scrollY;
                setScrolled(scrollY > 10);
                setBgBlack(scrollY > 10);
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

    return (

        <CustomAppBar position="fixed" scrolled={scrolled ? 1 : 0}
                      x={{
                              backgroundColor: bgBlack ? '#000' : 'transparent',
                              transition: 'background-color 1s ease',
                              color: '#fff',
                              fontFamily: 'Inter, sans-serif'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Box
                        component="img"
                        src={logoNavbard}
                        alt="logo"
                        onClick={() => navigate("/")}
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
                    <Button color="inherit" onClick={() => navigate("/Register-Form")}>Register</Button>
                    <Button color="inherit" onClick={() => navigate("/Login-Form")} >Login</Button>
                </Box>
            </Toolbar>
        </CustomAppBar>
    )
}

export default NavBard;
