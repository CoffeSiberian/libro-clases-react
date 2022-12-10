import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";


const ItemGrades = ({ id, name, count }) => {
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
					Curso:
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
					Alumnos:
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{count}</Typography>
				</div>
			</div>
			
			<Divider
				className="flexn"
				orientation="horizontal"
				variant="middle"
				flexItem
			/>
			
			<div className="flex justify-center mt-1">
				<Link to={"/students/"+id}>
					<Button variant="outlined" endIcon={<GroupIcon />}>
						Ver Alumnos
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default ItemGrades;
