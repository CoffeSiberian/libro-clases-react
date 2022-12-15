import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GradeIcon from "@mui/icons-material/Grade";
import Button from "@mui/material/Button";
import rutFormater from "../../helpers/rutFormat";

const ItemLessons = ({
	id,
	name,
	EmployeeRut,
	EmployeeName,
	GradeName,
	GradeId,
}) => {
	return (
		<div className="shadow-xl m-5 p-2 border-2 border-inherit rounded-md">
			<div className="grid grid-cols-2 items-center">
				<Typography className="text-right" variant="subtitle1">
					ID:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{id}</Typography>
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
					Curso:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{GradeName}</Typography>
				</div>
			</div>

			<Divider
				className="flex"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>

			<Typography className="text-center" variant="subtitle1">
				Profesor
			</Typography>
			<Typography className="text-center" variant="body2">
				{rutFormater(EmployeeRut)}
			</Typography>
			<Typography className="text-center" variant="body2">
				{EmployeeName}
			</Typography>

			<Divider
				className="flex"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>

			<div className="flex justify-center space-x-4 mt-1">
				<Link to={`/scheduler/${id}`}>
					<Button variant="outlined" endIcon={<CalendarMonthIcon />}>
						Horarios
					</Button>
				</Link>
				<Link to={`/studentsQualifi/${GradeId}/${id}`}>
					<Button variant="outlined" endIcon={<GradeIcon />}>
						Calificaiones
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default ItemLessons;
