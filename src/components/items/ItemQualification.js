import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const ItemQualification = ({ id, score }) => {
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
					Nota
				</Typography>
				<div className="ml-2">
					<Typography variant="body2">{score}</Typography>
				</div>
			</div>
		</div>
	);
};

export default ItemQualification;
