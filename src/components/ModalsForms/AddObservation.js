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
import ObservationBar from "./ObservationBar";
import getTokenData from "../../helpers/getTokenData";

const AddObservation = ({ reload, rut, name, gradeId }) => {
	const jwt_obj = getTokenData()
	const user_rank = jwt_obj.rank;
	const baseData = {
		observation: "",
		fk_student: rut,
	};
	const baseErrData = {
		observation: false,
		fk_student: false,
	};

	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError] = useFetch(
		`${process.env.REACT_APP_APIURL}/addobservations`,
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
			{user_rank === 2 ? (
				<ObservationBar name={name} gradeId={gradeId} />
			) : (
				<ObservationBar
					name={name}
					gradeId={gradeId}
					button={
						<Button variant="contained" onClick={() => setOpen(true)}>
							Agregar Observación
						</Button>
					}
				/>
			)}

			<Dialog
				open={open}
				keepMounted
				fullWidth
				onClose={() => setOpen(false)}
				aria-describedby="add-student"
			>
				<DialogTitle>Agregar Observación</DialogTitle>
				<DialogContent>
					<ModalLoading open={loading} />
					<AlertModal
						title="No pudimos agregar la observación"
						description="Intenta mas tarde"
						handleClose={() => setError(false)}
						open={error}
					/>
					<DialogContentText id="add-student-info">
						Ingresa la observación
					</DialogContentText>
					<div className="mt-3 space-y-3">
						<TextField
							required
							id="observation"
							fullWidth
							multiline
							minRows={7}
							maxRows={15}
							variant="outlined"
							label="Observación"
							value={data.observation}
							onChange={handleChangeText}
							error={dataErr.observation}
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

export default AddObservation;
