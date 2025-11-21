import NavBard from "../../component/NavBard.tsx";
import Footer from "../../component/Footer.tsx";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import NavBarBannerTypography from "../../component/NavBarBannerTypography.tsx";

const LayoutWithNavBar = () => {
    return (
        <Box>
            <NavBard><NavBarBannerTypography/></NavBard>
            <Outlet></Outlet>
            <Footer/>
        </Box>
    )
}
export default LayoutWithNavBar;