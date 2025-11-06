import NavBard from "../component/NavBard.tsx";
import Footer from "../component/Footer.tsx";
import { Outlet } from "react-router-dom";
import {Box} from "@mui/material";

const LayoutWithNavBar = () => {
    return(
        <Box >
            <NavBard/>
            <Outlet></Outlet>
            <Footer/>
        </Box>


    )
}
export default LayoutWithNavBar;