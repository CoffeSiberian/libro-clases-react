import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";

const LessonEmployeeSelect = ({ data, change, error }) => {
	const loaded = useRef(false);
	const [listEmployees, setListEmployees] = useState(false);

	// eslint-disable-next-line
	const [loadingEmp, errorEmp, succesEmp, bodySetEmp] = useFetch(
		`${process.env.REACT_APP_APIURL}/getonlyteachers`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getEmployees = async () => {
		let fetchResponse = await bodySetEmp();
		if (fetchResponse.status === 200) {
			return setListEmployees(await fetchResponse.json());
		}
		return setListEmployees(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			getEmployees();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<TextField
			required
			select
			id="fk_teacher"
			label="Profesor"
			variant="outlined"
			fullWidth
			value={data}
			onChange={(e) => change(e.target.value, "fk_teacher")}
			error={error}
		>
			{listEmployees !== false ? (
				listEmployees.map((data) => (
					<MenuItem key={data.rut} value={data.rut}>
						{data.rut} - {data.name}
					</MenuItem>
				))
			) : (
				<MenuItem key="empy" value="empy" />
			)}
		</TextField>
	);
};

export default LessonEmployeeSelect;
