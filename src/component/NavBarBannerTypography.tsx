import {Typography} from "@mui/material";
import React from "react";

const NavBarBannerTypography = ({}) => {

    return (

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

    );
};

export default NavBarBannerTypography;
