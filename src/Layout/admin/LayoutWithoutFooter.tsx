import NavBard from "../../component/NavBard.tsx";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import NavBarButtons from "../../component/NavBarButtons.tsx";

const LayoutWithoutFooter = () => {

    return (
        <Box>
            <NavBard><NavBarButtons/></NavBard>
            <Outlet/>
        </Box>

    )
}
export default LayoutWithoutFooter;