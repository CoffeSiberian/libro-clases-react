import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import useFetch from "../hooks/useFetch";
import AlertModal from "./AlertModal";
import SnackBarCom from "./SnackBarCom";

const SubmitButton = ({ checkTextError, data }) => {
	const [openEmpyData, setOpenEmpyData] = useState(false);
	const { loading, error, succes, bodySet, setError, setSucces } = useFetch(
		"http://127.0.0.1:8443/login",
		"POST"
	);

	const dataEmpyToSend = async () => {
		if (checkTextError()) return setOpenEmpyData(true);
		let fetchResponse = await bodySet(data);
		if (fetchResponse.ok) {
			let token = await fetchResponse.json()
			localStorage.setItem("token", token["token"]);
		}
	};

	return (
		<div>
			<AlertModal
				title="Completa toda la informacion"
				description="Falta informacion que completes en el formulario"
				handleClose={() => setOpenEmpyData(false)}
				open={openEmpyData}
			/>
			<AlertModal
				title="No pudimos enviar el formulario"
				description="Verifica tu conexion a internet o intenta mas tarde"
				handleClose={() => setError(false)}
				open={error}
			/>
			<SnackBarCom
				msj="Sesion iniciada con éxito"
				severity="success"
				open={succes}
				setOpen={setSucces}
			/>
			<LoadingButton
				endIcon={<SendIcon />}
				loading={loading}
				loadingPosition="end"
				variant="contained"
				size="large"
				onClick={dataEmpyToSend}
			>
				Iniciar sesión
			</LoadingButton>
		</div>
	);
};

export default SubmitButton;
