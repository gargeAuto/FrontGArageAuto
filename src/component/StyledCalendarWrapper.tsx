import styled from "styled-components";
import {Box} from "@mui/material";


const StyledCalendarWrapper = styled(Box)(({theme}) => ({
    // Style général du conteneur
    "& .fc": {

        "--fc-border-color": "#0e3f60", // Lignes de grille très claires
        "--fc-now-indicator-color": "#f00",
    },

    // --- 1. CELLULES & GRILLE (Effet "Espace") ---

    // Enlève les bordures moches du header
    "& .fc-theme-standard th": {
        border: "none",
        padding: "10px 0",

    },

    // Ajoute un padding dans les colonnes pour que les événements ne touchent pas les bords (Effet flottant)
    "& .fc-timegrid-col-frame": {
        padding: "4px",
    },

    // Arrondir les cellules de sélection (quand on clique pour créer)
    "& .fc-highlight": {
        borderRadius: "20px",
        backgroundColor: "rgba(25, 118, 210, 0.1)",
    },

    // --- 2. ÉVÉNEMENTS (Rendez-vous ergonomiques) ---

    // Le conteneur global de l'événement
    "& .fc-v-event": {
        backgroundColor: "transparent", // On gère la couleur nous-mêmes
        border: "none",
        boxShadow: "none",
        // Important : permet de voir notre propre border-radius
        overflow: "visible",
    },

    // Le contenu interne de l'événement (notre "carte")
    "& .fc-event-main": {
        borderRadius: "10px", // Coins bien ronds
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // Ombre douce (effet 3D)
        padding: 0, // On gère le padding à l'intérieur
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",

        // Effet au survol
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            zIndex: 5,
        }
    },

    // Cache le titre par défaut moche de FullCalendar
    "& .fc-event-main-frame": {
        display: "none",
    },
}));
export default StyledCalendarWrapper;