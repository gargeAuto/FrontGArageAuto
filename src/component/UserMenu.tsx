import {useState} from "react";
import {Avatar, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("af.account"); // supprime le token
        window.location.reload(); // recharge la page pour déclencher ton context ProviderUserLog
    };

    return (
        <>
            <Tooltip title="Compte">
                <IconButton onClick={handleClick} size="small" sx={{ml: 2}}>
                    <Avatar sx={{width: 36, height: 36, bgcolor: "primary.main"}}>
                        U
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" sx={{mr: 1}}/>
                    Se déconnecter
                </MenuItem>
            </Menu>
        </>
    );
}
