import { useState } from "react";
import { Navigate } from "react-router-dom";
import ModalLoading from "../../components/ModalLoading";
import ExampleDatas from "../../components/ExampleDatas";
import useValidUser from "../../hooks/useValidUser";
import TextField from "@mui/material/TextField";
import testlogo from "../../static/img/testlogo.webp";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LoginButton from "../../components/LoginButton";
import rutFormater from "../../helpers/rutFormat";

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

	const [loading, aut] = useValidUser();

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

	const handleChangeTextUser = (event) => {
		let eId = event.target.attributes.id.value;
		let eValue = event.target.value;
		let expression = /[0-9]+/;
		let expressionK = /k+/i;
		if (event.nativeEvent.data === null) {
			return setData({ ...data, [eId]: rutFormater(eValue) });
		}
		if (event.nativeEvent.data.match(expression)) {
			return setData({ ...data, [eId]: rutFormater(eValue) });
		}
		if (event.nativeEvent.data.match(expressionK)) {
			return setData({ ...data, [eId]: rutFormater(eValue) });
		}
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

	if (aut === true) {
		return <Navigate to={"/dashboard"} replace={true} />;
	} else if (aut === null) return <ModalLoading open={loading} />;
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
					onChange={handleChangeTextUser}
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
			<ExampleDatas />
		</div>
	);
};

export default Login;
