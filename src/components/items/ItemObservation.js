import { useState } from "react";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import AlertModal from "../AlertModal";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ItemObservation = ({ date, observation }) => {
	const options = {
		dateStyle: "full",
	};
	const optionsHour = {
		hour12: false,
		hour: "numeric",
		minute: "numeric",
	};

	const dateStartObj = new Date(date).toLocaleDateString("es-CL", options);
	const HourStartObj = new Date(date).toLocaleTimeString("es-CL", optionsHour);

	const [open, setOpen] = useState(false);

	return (
		<div className="shadow-xl m-5 p-2 border-2 border-inherit rounded-md">
			<div className="text-center space-y-2 mb-2">
				<Typography variant="subtitle1">{dateStartObj}</Typography>
				<Typography
					className="flex justify-center space-x-1"
					variant="body2"
					component="div"
				>
					<p>A las</p>
					<p className="text-red-700">{HourStartObj}</p>
				</Typography>
			</div>

			<Divider
				className="flexn"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>

			<AlertModal
				title="Observación"
				description={observation}
				handleClose={() => setOpen(false)}
				open={open}
			/>
			
			<div className="flex justify-center mt-2">
				<Button
					endIcon={<VisibilityIcon />}
					variant="outlined"
					onClick={() => setOpen(true)}
				>
					Ver Observación
				</Button>
			</div>
		</div>
	);
};

export default ItemObservation;
