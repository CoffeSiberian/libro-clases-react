import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

const SchedulerBar = ({ button }) => {
	const navigate = useNavigate();
	return (
		<div>
			<Typography className="md:hidden flex justify-center" variant="h5">
				Horarios
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					Horarios
				</Typography>
				<IconButton
					aria-label="delete"
					onClick={() => navigate("/lessons", { replace: true })}
				>
					<ArrowBackIcon />
				</IconButton>
                {button}
			</div>
		</div>
	);
};

export default SchedulerBar;
