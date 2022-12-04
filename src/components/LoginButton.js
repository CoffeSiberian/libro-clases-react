import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import useFetch from "../hooks/useFetch";
import LoginIcon from "@mui/icons-material/Login";
import AlertModal from "./AlertModal";

const SubmitButton = ({ checkTextError, data }) => {
	const navigate = useNavigate();
	const [openEmpyData, setOpenEmpyData] = useState(false);
	const { loading, error, bodySet, setError } = useFetch(
		`${process.env.REACT_APP_APIURL}/login`,
		"POST",
		{ "Content-Type": "application/json" }
	);

	const dataEmpyToSend = async () => {
		if (checkTextError()) return setOpenEmpyData(true);
		let fetchResponse = await bodySet(data);
		if (fetchResponse.ok) {
			let token = await fetchResponse.json();
			localStorage.setItem("token", token["token"]);
			navigate("/dashboard", { replace: true });
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
				title="Error"
				description="Intenta mas tarde"
				handleClose={() => setError(false)}
				open={error}
			/>
			<LoadingButton
				endIcon={<LoginIcon />}
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
