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
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { getLocalToken } from "../../helpers/validateToken";
import ModalLoading from "../ModalLoading";
import AlertModal from "../AlertModal";

const AddLesson = ({ reload }) => {
	const baseData = {
		name: "",
		fk_teacher: "",
		fk_grade: "",
	};
	const baseErrData = {
		name: false,
		fk_teacher: false,
		fk_grade: false,
	};

	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);
	
	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/addlessons`,
		"POST",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const handleChangeText = (event) => {
		let eId = event.target.attributes.id.value;
		let eValue = event.target.value;
		setData({ ...data, [eId]: eValue });
	};

	const checkTextError = () => {
		let err = {};
		let returnErr = false;
		for (let r in data) {
			if (data[r].length === 0) {
				err[r] = true;
				returnErr = true;
			} else err[r] = false;
		}
		setDataErr(err);
		return returnErr;
	};

	const dataEmpyToSend = async () => {
		if (checkTextError()) return;
		let fetchResponse = await bodySet(data);
		if (fetchResponse.ok) {
			resetAllData();
			setOpen(false);
			reload();
		}
	};

	const handleChangeSelect = (eValue, keyName) => {
		setData({ ...data, [keyName]: eValue });
	};

	const resetAllData = () => {
		setData(baseData);
		setDataErr(baseErrData);
	};

	return (
		<div>
			<Typography className="md:hidden flex justify-center" variant="h5">
				Materias
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					Materias
				</Typography>
				<IconButton
					aria-label="delete"
					onClick={() => navigate("/dashboard", { replace: true })}
				>
					<ArrowBackIcon />
				</IconButton>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Agregar Materia
				</Button>
			</div>
			<Dialog
				open={open}
				keepMounted
				fullWidth
				onClose={() => setOpen(false)}
				aria-describedby="add-lesson"
			>
				<DialogTitle>Agregar Materia</DialogTitle>
				<DialogContent>
					<ModalLoading open={loading} />
					<AlertModal
						title="No pudimos agregar la materia"
						description="Intenta mas tarde"
						handleClose={() => setError(false)}
						open={error}
					/>
					<DialogContentText id="add-lesson-info">
						Ingresa los datos de la materia
					</DialogContentText>
					<div className="mt-3 space-y-3">
						<TextField
							required
							id="name"
							fullWidth
							variant="outlined"
							label="Nombre"
							value={data.name}
							onChange={handleChangeText}
							error={dataErr.name}
						/>
						<TextField
							required
							select
							id="fk_grade"
							label="Curso"
							variant="outlined"
							fullWidth
							value={data.fk_grade}
							onChange={(e) => handleChangeSelect(e.target.value, "fk_grade")}
							error={dataErr.fk_grade}
						>
							<MenuItem key={10} value={10}>
								Director
							</MenuItem>
							<MenuItem key={2} value={2}>
								Inspector
							</MenuItem>
							<MenuItem key={1} value={1}>
								Profesor
							</MenuItem>
						</TextField>
						<TextField
							required
							select
							id="fk_teacher"
							label="Profesor"
							variant="outlined"
							fullWidth
							value={data.fk_teacher}
							onChange={(e) => handleChangeSelect(e.target.value, "fk_teacher")}
							error={dataErr.fk_teacher}
						>
							<MenuItem key={10} value={10}>
								Director
							</MenuItem>
							<MenuItem key={2} value={2}>
								Inspector
							</MenuItem>
							<MenuItem key={1} value={1}>
								Profesor
							</MenuItem>
						</TextField>
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

export default AddLesson;
