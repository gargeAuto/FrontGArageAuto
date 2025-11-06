import {useEffect, useState} from "react";
import {Accordion, Box} from "@mui/material";
import CarSearch from "../component/CarSearch.tsx";
import type {CarSelection} from "../type/car.ts";
import BookingCalendar from "../component/BookingCalendar.tsx";

const Car = () => {
    const [immat, setImmat] = useState<string>("");
    const [km, setKm] = useState<string>("");
    const [carSel, setCarSel] = useState<CarSelection>({} as CarSelection);
    const [isValid, setIvalid] = useState(false);
    return (

        <Box
            sx={{
                display: "flex",
                height: "100vh",
                maxWidth: "100vw",
                alignItems:"center",
                gap: 1,// Prend toute la hauteur
                // fond du site à droite
            }}
        >
            <Box
                sx={{
                    width: "50%", // largeur du panneau gauche
                    height: "100%", // prend toute la hauteur
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft:"10px"
                }}
            >
                <CarSearch
                    immat={immat}
                    km={km}
                    onChangeImmat={setImmat}
                    onChangeKm={setKm}
                    onChangeCar={setCarSel}
                    onValidityChange={setIvalid}
                />
            </Box>
                <BookingCalendar
                    getHoursForDate={() => ({openingHour: 9, closingHour: 18})}
                    isCarValid={isValid}
                    setCarLocalStorage={carSel}


                />
        </Box>
    );
};

export default Car;
