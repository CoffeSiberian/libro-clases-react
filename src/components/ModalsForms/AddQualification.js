import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { getLocalToken } from "../../helpers/validateToken";
import ModalLoading from "../ModalLoading";
import AlertModal from "../AlertModal";

const AddQualification = ({ reload, rut, lessonName, lessonId, gradeId }) => {
	const baseData = {
		score: "",
		fk_lesson: lessonId,
		fk_student: rut,
	};
	const baseErrData = {
		score: false,
		fk_lesson: false,
		fk_student: false,
	};

	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/addqualification`,
		"POST",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const handleChangeText = (event) => {
		let eId = event.target.attributes.id.value;
		let value = event.target.value;
		if (!checkNumErr(eId, value)) {
			return setData({ ...data, [eId]: parseFloat(value) });
		}
		setData({ ...data, [eId]: value });
	};

	const checkNumErr = (id, value) => {
		let expression = /[1-7]+\.+[0-9]+/;
		if (value === "") {
			setDataErr({ ...dataErr, [id]: true });
			return true;
		}

		if (!value.match(expression)) {
			setDataErr({ ...dataErr, [id]: true });
			return true;
		}

		if (parseFloat(value) > 7 || parseFloat(value) < 1) {
			setDataErr({ ...dataErr, [id]: true });
			return true;
		}

		setDataErr({ ...dataErr, [id]: false });
		return false;
	};

	const dataEmpyToSend = async () => {
		if (dataErr.score) return false;
		let fetchResponse = await bodySet(data);
		if (fetchResponse.ok) {
			resetAllData();
			setOpen(false);
			reload();
		}
	};

	const resetAllData = () => {
		setData(baseData);
		setDataErr(baseErrData);
	};

	return (
		<div>
			<Typography className="md:hidden flex justify-center" variant="h5">
				{rut} - {lessonName}
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					{rut} - {lessonName}
				</Typography>
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
				<Button variant="contained" onClick={() => setOpen(true)}>
					Agregar Nota
				</Button>
			</div>
			<Dialog
				open={open}
				keepMounted
				fullWidth
				onClose={() => setOpen(false)}
				aria-describedby="add-grade"
			>
				<DialogTitle>Agregar Nota</DialogTitle>
				<DialogContent>
					<ModalLoading open={loading} />
					<AlertModal
						title="No pudimos agregar el curso"
						description="Intenta mas tarde"
						handleClose={() => setError(false)}
						open={error}
					/>
					<DialogContentText id="add-grade-info">
						Ingresa la nota entre 1.0 y 7.0
					</DialogContentText>
					<div className="mt-3 space-y-3">
						<TextField
							required
							id="score"
							fullWidth
							variant="outlined"
							label="Nota"
							value={data.score}
							onChange={handleChangeText}
							error={dataErr.score}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={dataEmpyToSend}>Agregar</Button>
					<Button onClick={() => setOpen(false)}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddQualification;
