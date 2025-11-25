import NavBard from "../../component/NavBard.tsx";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import NavBarButtons from "../../component/NavBarButtons.tsx";

const LayoutWithoutFooter = () => {

    return (
        <Box>
            <NavBard><NavBarButtons/></NavBard>
            <Box sx={{ mt: 10 }}>
            <Outlet/>
            </Box>
        </Box>

    )
}
export default LayoutWithoutFooter;