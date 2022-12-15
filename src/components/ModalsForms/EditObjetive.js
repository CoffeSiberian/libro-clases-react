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
import EditIcon from "@mui/icons-material/Edit";

const EditObjetive = ({ reload, schedulerId, objetive }) => {
	const baseData = {
		id: schedulerId,
		objetive: objetive,
	};
	const baseErrData = {
		id: false,
		objetive: false,
	};

	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError] = useFetch(
		`${process.env.REACT_APP_APIURL}/editobjective`,
		"PUT",
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
			setOpen(false);
			reload();
		}
	};

	return (
		<div className="grid">
			<Button
				endIcon={<EditIcon />}
				variant="outlined"
				onClick={() => setOpen(true)}
			>
				Editar Objetivo
			</Button>

			<Dialog
				open={open}
				keepMounted
				fullWidth
				onClose={() => setOpen(false)}
				aria-describedby="add-student"
			>
				<DialogTitle>Editar objetivo de clase</DialogTitle>
				<DialogContent>
					<ModalLoading open={loading} />
					<AlertModal
						title="No pudimos editar el objetivo"
						description="Intenta mas tarde"
						handleClose={() => setError(false)}
						open={error}
					/>
					<DialogContentText id="edit-objetive">
						Ingresa el objetivo
					</DialogContentText>
					<div className="mt-3 space-y-3">
						<TextField
							required
							id="objetive"
							fullWidth
							multiline
							minRows={7}
							maxRows={15}
							variant="outlined"
							label="Objetivo"
							value={data.objetive}
							onChange={handleChangeText}
							error={dataErr.objetive}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={dataEmpyToSend}>Editar</Button>
					<Button onClick={() => setOpen(false)}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditObjetive;
