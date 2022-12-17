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
import LessonGradeSelect from "./LessonGradeSelect";
import LessonEmployeeSelect from "./LessonEmployeeSelect";
import LessonsBar from "./LessonsBar";

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

	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError] = useFetch(
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
			<LessonsBar
				button={
					<Button variant="contained" onClick={() => setOpen(true)}>
						Agregar Materia
					</Button>
				}
			/>
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
						<LessonGradeSelect
							data={data.fk_grade}
							change={handleChangeSelect}
							error={dataErr.fk_grade}
						/>
						<LessonEmployeeSelect
							data={data.fk_teacher}
							change={handleChangeSelect}
							error={dataErr.fk_teacher}
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

export default AddLesson;
