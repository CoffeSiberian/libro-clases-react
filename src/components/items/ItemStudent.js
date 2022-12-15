import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import rutFormater from "../../helpers/rutFormat";

const ItemStudent = ({ rut, name }) => {
	return (
		<div className="shadow-xl m-5 p-2 border-2 border-inherit rounded-md">
			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					RUT:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{rutFormater(rut)}</Typography>
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
				className="flexn"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>

			<div className="grid mt-1">
				<Link className="grid" to={"/observation/" + rut}>
					<Button variant="outlined" endIcon={<NoteAltIcon />}>
						Observaciones
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default ItemStudent;
