import NavBard from "../component/NavBard.tsx";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";

const LayoutWithoutFooter = () => {
    return (
        <Box>
            <NavBard/>
            <Outlet></Outlet>
        </Box>


    )
}
export default LayoutWithoutFooter;