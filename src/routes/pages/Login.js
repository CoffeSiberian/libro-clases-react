import { useState } from "react";
import TextField from "@mui/material/TextField";
import testlogo from "../../static/img/testlogo.webp";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LoginButton from "../../components/LoginButton";

const Login = () => {
	const baseData = {
		rut: "",
		pass: "",
	};
	const baseErrData = {
		rut: false,
		pass: false,
	};

	const [togglePass, setTogglePass] = useState("password");
	const [data, setData] = useState(baseData);
	const [dataErr, setDataErr] = useState(baseErrData);

	const checkTogglePass = (event) => {
		let status = event.target.checked;
		if (status) setTogglePass("text");
		else setTogglePass("password");
	};

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

			<div className="flex flex-col space-y-4 p-5 w-4/5 md:w-1/4">
				<TextField
					required
					id="rut"
					value={data.rut}
					onChange={handleChangeText}
					error={dataErr.rut}
					label="RUT"
					type="text"
				/>
				<TextField
					required
					id="pass"
					value={data.pass}
					onChange={handleChangeText}
					error={dataErr.pass}
					label="Contraseña"
					type={togglePass}
				/>
				<FormControlLabel
					onChange={checkTogglePass}
					control={<Checkbox />}
					label="Ver contraseña"
				/>
				<div className="grid justify-items-center">
					<LoginButton
						checkTextError={checkTextError}
						data={data}
					></LoginButton>
				</div>
			</div>
		</div>
	);
};

export default Login;
