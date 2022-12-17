import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GradesBar = ({ button }) => {
	const navigate = useNavigate();
	return (
		<div>
			<Typography className="md:hidden flex justify-center" variant="h5">
				Cursos
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					Cursos
				</Typography>
				<IconButton
					aria-label="delete"
					onClick={() => navigate("/dashboard", { replace: true })}
				>
					<ArrowBackIcon />
				</IconButton>
				{button}
			</div>
		</div>
	);
};

export default GradesBar;
