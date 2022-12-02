import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import useFetch from "../hooks/useFetch";
import AlertModal from "./AlertModal";

const SubmitButton = ({ checkTextError, data }) => {
	const [openEmpyData, setOpenEmpyData] = useState(false);
	const { loading, error, succes, bodySet, setError, setSucces } = useFetch(
		"http://127.0.0.1/login"
	);

	const dataEmpyToSend = async () => {
		if (checkTextError()) {
			return setOpenEmpyData(true);
		}
		let fetchResponse = await bodySet(data);
		if (fetchResponse.ok) {
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
			<LoadingButton
				className="w-5/6"
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
