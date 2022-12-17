import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

const ObservationBar = ({ name, gradeId, button }) => {
	const navigate = useNavigate();
	return (
		<div>
			<Typography className="md:hidden flex justify-center" variant="h5">
				{name}
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					{name}
				</Typography>
				<IconButton
					aria-label="Return"
					onClick={() => navigate(`/students/${gradeId}`, { replace: true })}
				>
					<ArrowBackIcon />
				</IconButton>
				{button}
			</div>
		</div>
	);
};

export default ObservationBar;
