import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

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
	const HourStartObj = new Date(date).toLocaleTimeString(
		"es-CL",
		optionsHour
	);

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

			<div className="grid grid-cols-1 items-center">
				<Typography className="text-center" variant="subtitle1">
					Observación:
				</Typography>
				<div>
					<Typography className="text-center" variant="body2">{observation}</Typography>
				</div>
			</div>
		</div>
	);
};

export default ItemObservation;
