import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const ItemSchedule = ({ name, grade, dateStart, dateEnd, objetive }) => {
	return (
		<div className="shadow-xl m-5 p-2 border-2 border-inherit rounded-md">
			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					Name:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{name}</Typography>
				</div>
			</div>

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
			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					Inicio Clase:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{dateStart}</Typography>
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
					Fin Clase:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{dateEnd}</Typography>
				</div>
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
