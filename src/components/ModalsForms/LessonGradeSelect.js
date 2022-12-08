import { useEffect, useRef, useState } from "react";
import { getLocalToken } from "../../helpers/validateToken";
import useFetch from "../../hooks/useFetch";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const LessonGradeSelect = ({ data, change, error }) => {
	const loaded = useRef(false);
	const [listGrades, setListGrades] = useState(false);

	// eslint-disable-next-line
	const [loadingEmp, errorEmp, succesEmp, bodySetEmp] = useFetch(
		`${process.env.REACT_APP_APIURL}/getallgrades`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getGrades = async () => {
		let fetchResponse = await bodySetEmp();
		if (fetchResponse.status === 200) {
			return setListGrades(await fetchResponse.json());
		}
		return setListGrades(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			getGrades();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<TextField
			required
			select
			id="fk_grade"
			label="Curso"
			variant="outlined"
			fullWidth
			value={data}
			onChange={(e) => change(e.target.value, "fk_grade")}
			error={error}
		>
			{listGrades !== false ? (
				listGrades.map((data) => (
					<MenuItem key={data.id} value={data.id}>
						{data.name}
					</MenuItem>
				))
			) : (
				<MenuItem key="empy" value="empy" />
			)}
		</TextField>
	);
};

export default LessonGradeSelect;
