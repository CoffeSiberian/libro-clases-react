import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

const DropProfile = () => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login", { replace: true });
	};
	return (
		<div>
			<IconButton onClick={handleClick}>
				<Avatar sx={{ bgcolor: "#ad1457" }} />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem onClick={logout}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText>Cerrar sesion</ListItemText>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default DropProfile;
