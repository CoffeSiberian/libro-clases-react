import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const ItemSchedule = ({ name, grade, dateStart, dateEnd, objetive }) => {
	const options = {
		dateStyle: "full",
	};
	const optionsHour = {
		hour12: false,
		hour: "numeric",
		minute: "numeric",
	};

	const dateStartObj = new Date(dateStart).toLocaleDateString("es-CL", options);
	const HourStartObj = new Date(dateStart).toLocaleTimeString(
		"es-CL",
		optionsHour
	);
	const HourEndObj = new Date(dateEnd).toLocaleTimeString("es-CL", optionsHour);

	return (
		<div className="shadow-xl m-5 p-2 border-2 border-inherit rounded-md">
			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					Materia:
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

			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					Curso:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{grade}</Typography>
				</div>
			</div>

			<Divider
				className="flexn"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>

			<div className="grid justify-center">
				<Typography className="text-right" variant="subtitle1">
					Horario
				</Typography>
			</div>
			<div className="text-center space-y-2 mb-2">
				<Typography variant="body2">{dateStartObj}</Typography>
				<Typography
					className="flex justify-center space-x-1"
					variant="body2"
					component="div"
				>
					<p>Desde las</p>
					<p className="text-red-700">{HourStartObj}</p>
					<p>hasta las</p>
					<p className="text-green-700">{HourEndObj}</p>
				</Typography>
			</div>

			<Divider
				className="flex"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>

			<Typography className="text-center" variant="subtitle1">
				Objetivo de clase
			</Typography>
			{objetive !== null ? (
				<Typography className="text-center" variant="body2">
					{objetive}
				</Typography>
			) : (
				<Typography className="text-center" variant="body2">
					No definido
				</Typography>
			)}
		</div>
	);
};

export default ItemSchedule;
