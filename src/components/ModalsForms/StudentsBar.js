import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const StudentsBar = ({ button, gradeName }) => {
	const navigate = useNavigate();
	return (
		<div>
			<Typography className="md:hidden flex justify-center" variant="h5">
				Estudiantes {gradeName}
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					Estudiantes {gradeName}
				</Typography>
				<IconButton
					aria-label="Return"
					onClick={() => navigate("/grades", { replace: true })}
				>
					<ArrowBackIcon />
				</IconButton>
				{button}
			</div>
		</div>
	);
};

export default StudentsBar;
