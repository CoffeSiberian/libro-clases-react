import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import testlogo from "../static/img/testlogo.webp";
import DropProfile from "./DropProfile";

const Heder = () => {
	return (
		<AppBar position="sticky">
			<Toolbar disableGutters>
				<div className="flex flex-row w-full h-16 p-2">
					<div className="flex items-center w-full space-x-2">
						<Typography color="white">Sistema Escolar</Typography>
						<Divider orientation="vertical" />
					</div>
					<div className="md:flex hidden w-full justify-end md:justify-center">
						<img className="object-cover" src={testlogo} alt="dcicon" />
					</div>
					<div className="flex justify-end w-full items-center space-x-2">
						<Divider orientation="vertical" />
						<DropProfile />
					</div>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Heder;
