import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const ItemEmployee = ({ name, rut, rank }) => {
    const rankName = () => {
		switch (rank) {
			case 10:
				return "Director";
			case 2:
				return "Inspector";
			case 1:
				return "Profesor";
			default:
				return "";
		}
	};
	return (
		<div className="flex flex-col items-center md:flex-row md:justify-between shadow-xl p-1 border-2 border-red-400 rounded-md">
			<Avatar />
			<Divider className="hidden md:flex" orientation="vertical" variant="middle" flexItem />

			<Typography variant="h6">{name}</Typography>

			<Divider className="hidden md:flex" orientation="vertical" variant="middle" flexItem />

			<Typography variant="h6">{rut}</Typography>

			<Divider className="hidden md:flex" orientation="vertical" variant="middle" flexItem />

			<Typography variant="h6">{rankName()}</Typography>
		</div>
	);
};

export default ItemEmployee;
