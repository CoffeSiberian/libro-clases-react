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
		<div className="shadow-xl m-5 p-2 border-2 border-inherit rounded-md">
			<div className="flex justify-center">
				<Avatar />
			</div>

			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					RUT:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{rut}</Typography>
				</div>
			</div>

			<Divider
				className="flexn"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>
			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					Nombre:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{name}</Typography>
				</div>
			</div>

			<Divider
				className="flex"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>
			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					Rango:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{rankName()}</Typography>
				</div>
			</div>
		</div>
	);
};

export default ItemEmployee;
