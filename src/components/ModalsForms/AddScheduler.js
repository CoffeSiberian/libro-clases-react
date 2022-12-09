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
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";

const AddScheduler = ({ reload, id }) => {
	const baseData = {
		startAt: Date(),
		endAt: Date(),
		fk_lesson: id,
	};

	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(baseData);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/addschedule`,
		"POST",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const handleChangeDate = (type, date) => {
		let eId = type;
		let eValue = date;
		setData({ ...data, [eId]: eValue });
	};

	const dataEmpyToSend = async () => {
		let fetchResponse = await bodySet(data);
		if (fetchResponse.ok) {
			resetAllData();
			setOpen(false);
			reload();
		}
	};

	const resetAllData = () => {
		setData(baseData);
	};

	return (
		<div>
			<Typography className="md:hidden flex justify-center" variant="h5">
				Horarios
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					Horarios
				</Typography>
				<IconButton
					aria-label="delete"
					onClick={() => navigate("/lessons", { replace: true })}
				>
					<ArrowBackIcon />
				</IconButton>
				<Button variant="contained" onClick={() => setOpen(true)}>
					Agregar horario
				</Button>
			</div>
			<Dialog
				open={open}
				keepMounted
				fullWidth
				onClose={() => setOpen(false)}
				aria-describedby="add-scheduler"
			>
				<DialogTitle>Agregar Horario</DialogTitle>
				<DialogContent>
					<ModalLoading open={loading} />
					<AlertModal
						title="No pudimos agregar el horario"
						description="Intenta mas tarde"
						handleClose={() => setError(false)}
						open={error}
					/>
					<DialogContentText id="add-scheduler-info">
						Ingresa los datos del horario
					</DialogContentText>
					<Stack mt={2} spacing={3}>
						<LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
							<MobileDateTimePicker
								inputFormat="DD/MM/YYYY HH:mm"
								label="Fecha y hora de inicio"
								value={data.startAt}
								onChange={(date) => handleChangeDate("startAt", date)}
								renderInput={(params) => <TextField {...params} />}
							/>
							<MobileDateTimePicker
								inputFormat="DD/MM/YYYY HH:mm"
								label="Fecha y hora de Termino"
								value={data.endAt}
								onChange={(date) => handleChangeDate("endAt", date)}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={dataEmpyToSend}>Agregar</Button>
					<Button onClick={() => setOpen(false)}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddScheduler;
