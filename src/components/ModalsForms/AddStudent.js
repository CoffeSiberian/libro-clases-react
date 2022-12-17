import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { getLocalToken } from "../../helpers/validateToken";
import ModalLoading from "../ModalLoading";
import AlertModal from "../AlertModal";
import StudentsBar from "./StudentsBar";
import rutFormater from "../../helpers/rutFormat";

const AddStudent = ({ reload, gradeId, gradeName }) => {
	const baseData = {
		rut: "",
		name: "",
		fk_grade: gradeId,
	};
	const baseErrData = {
		rut: false,
		name: false,
	};

	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError] = useFetch(
		`${process.env.REACT_APP_APIURL}/addstudent`,
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

	const handleChangeTextUser = (event) => {
		let eId = event.target.attributes.id.value;
		let eValue = event.target.value;
		let expression = /[0-9]+/;
		if (event.nativeEvent.data === null) {
			return setData({ ...data, [eId]: rutFormater(eValue) });
		}
		if (event.nativeEvent.data.match(expression)) {
			return setData({ ...data, [eId]: rutFormater(eValue) });
		}
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

	const resetAllData = () => {
		setData(baseData);
		setDataErr(baseErrData);
	};

	return (
		<div>
			<StudentsBar
				button={
					<Button variant="contained" onClick={() => setOpen(true)}>
						Agregar Estudiante
					</Button>
				}
				gradeName={gradeName}
			/>

			<Dialog
				open={open}
				keepMounted
				fullWidth
				onClose={() => setOpen(false)}
				aria-describedby="add-student"
			>
				<DialogTitle>Agregar Estudiante</DialogTitle>
				<DialogContent>
					<ModalLoading open={loading} />
					<AlertModal
						title="No pudimos agregar el estudiantes"
						description="Intenta mas tarde"
						handleClose={() => setError(false)}
						open={error}
					/>
					<DialogContentText id="add-student-info">
						Ingresa los datos del estudiante
					</DialogContentText>
					<div className="mt-3 space-y-3">
						<TextField
							required
							id="rut"
							fullWidth
							variant="outlined"
							label="RUT"
							value={data.rut}
							onChange={handleChangeTextUser}
							error={dataErr.rut}
						/>
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

export default AddStudent;
