import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import testlogo from "../../static/img/testlogo.webp";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

const Login = () => {
	const [togglePass, setTogglePass] = useState("password");

	const checkTogglePass = (event) => {
		let status = event.target.checked;
		if (status) setTogglePass("text");
		else setTogglePass("password");
	};

	return (
		<div className="flex w-full mt-5 flex-col items-center md:flex-row md:justify-center">
			<div className="p-1">
				<img
					className="h-48 w-48 rounded-full backdrop-blur-x1 border-4 
                    border-red-400 drop-shadow-2xl"
					src={testlogo}
					alt="logoImage"
				/>
			</div>

			<div className="flex flex-col space-y-4 p-5 w-5/6 md:w-3/6">
				<TextField required id="user" label="RUT" type="text" />
				<TextField required id="pass" label="Contraseña" type={togglePass} />
				<FormControlLabel
					onChange={checkTogglePass}
					control={<Checkbox />}
					label="Ver contraseña"
				/>
				<div className="grid justify-items-center">
					<LoadingButton
						className="w-2/3 md:w-1/3"
						variant="contained"
						size="medium"
						loading={false}
					>
						Iniciar seccion
					</LoadingButton>
				</div>
			</div>
		</div>
	);
};

export default Login;
