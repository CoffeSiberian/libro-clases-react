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

const AddEmployee = ({ reload }) => {
	const baseData = {
		rut: "",
		name: "",
		pass: "",
		rank: "",
	};
	const baseErrData = {
		rut: false,
		name: false,
		pass: false,
		rank: false,
	};

	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);

	const { loading, error, bodySet, setError } = useFetch(
		`${process.env.REACT_APP_APIURL}/addemployee`,
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
				<Typography
					className="md:hidden flex justify-center"
					variant="h5"
				>
					Empleados
				</Typography>
			<div className="flex justify-between p-2">
				<IconButton
					aria-label="delete"
					onClick={() => navigate("/dashboard", { replace: true })}
				>
					<ArrowBackIcon />
				</IconButton>
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					Empleados
				</Typography>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Agregar Empleado
				</Button>
			</div>
			<Dialog
				open={open}
				keepMounted
				onClose={() => setOpen(false)}
				aria-describedby="add-employee"
			>
				<DialogTitle>Agregar Empleado</DialogTitle>
				<DialogContent>
					<ModalLoading open={loading} />
					<AlertModal
						title="No pudimos agregar al Empleado"
						description="Intenta mas tarde"
						handleClose={() => setError(false)}
						open={error}
					/>
					<DialogContentText id="add-employe-info">
						Ingresa los datos del empleado
					</DialogContentText>
					<div className="mt-3 space-y-3">
						<TextField
							required
							id="rut"
							fullWidth
							variant="outlined"
							label="RUT"
							value={data.rut}
							onChange={handleChangeText}
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
						<TextField
							required
							id="pass"
							fullWidth
							variant="outlined"
							label="Contraseña"
							value={data.pass}
							onChange={handleChangeText}
							error={dataErr.pass}
						/>
						<TextField
							required
							select
							id="rank"
							label="Rango"
							variant="outlined"
							fullWidth
							value={data.rank}
							onChange={(e) => handleChangeSelect(e.target.value, "rank")}
							error={dataErr.rank}
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

export default AddEmployee;
