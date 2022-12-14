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
import GradesBar from "./GradesBar";

const AddGrade = ({ reload }) => {
	const baseData = {
		name: "",
	};
	const baseErrData = {
		name: false,
	};

	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/addgrade`,
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

	const resetAllData = () => {
		setData(baseData);
		setDataErr(baseErrData);
	};

	return (
		<div>
			<GradesBar
				button={
					<Button variant="contained" onClick={() => setOpen(true)}>
						Agregar Curso
					</Button>
				}
			/>

			<Dialog
				open={open}
				keepMounted
				fullWidth
				onClose={() => setOpen(false)}
				aria-describedby="add-grade"
			>
				<DialogTitle>Agregar Curso</DialogTitle>
				<DialogContent>
					<ModalLoading open={loading} />
					<AlertModal
						title="No pudimos agregar el curso"
						description="Intenta mas tarde"
						handleClose={() => setError(false)}
						open={error}
					/>
					<DialogContentText id="add-grade-info">
						Ingresa los datos del curso
					</DialogContentText>
					<div className="mt-3 space-y-3">
						<TextField
							required
							id="name"
							fullWidth
							variant="outlined"
							label="Nombre del Curso"
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

export default AddGrade;
