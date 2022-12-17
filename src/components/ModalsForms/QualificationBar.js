import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import rutFormater from "../../helpers/rutFormat";

const QualificationBar = ({ rut, lessonName, lessonId, gradeId, button }) => {
	const navigate = useNavigate();
	return (
		<div>
			<Typography className="md:hidden flex justify-center" variant="h5">
				{rutFormater(rut)}
			</Typography>
			<Typography className="md:hidden flex justify-center" variant="h5">
				{lessonName}
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<div className="hidden md:flex absolute w-full justify-center">
					<div className="flex flex-col items-center">
						<Typography variant="h5">{rutFormater(rut)}</Typography>
						<Typography variant="h5">{lessonName}</Typography>
					</div>
				</div>
				<IconButton
					aria-label="delete"
					onClick={() =>
						navigate(`/studentsQualifi/${gradeId}/${lessonId}`, {
							replace: true,
						})
					}
				>
					<ArrowBackIcon />
				</IconButton>
				{button}
			</div>
		</div>
	);
};

export default QualificationBar;
