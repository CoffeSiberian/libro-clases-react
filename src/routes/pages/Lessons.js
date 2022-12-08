import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import ItemLessons from "../../components/items/ItemLessons";
import CircularProgress from "@mui/material/CircularProgress";

const Lessons = () => {
	const loaded = useRef(false);
	const [listLessons, setListLessons] = useState(false);

	const { bodySet } = useFetch(
		`${process.env.REACT_APP_APIURL}/getalllessons`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getAllLessons = async () => {
		let fetchResponse = await bodySet();
		if (fetchResponse.status === 200) {
			return setListLessons(await fetchResponse.json());
		}
		return setListLessons(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			getAllLessons();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<div>
			<div className="grid md:grid-cols-2 p-3">
				{listLessons !== false ? (
					listLessons.map((data) => (
						<ItemLessons
							key={data.id}
							id={data.id}
							name={data.name}
							EmployeeRut={data.Employee.rut}
							EmployeeName={data.Employee.name}
							GradeName={data.Grade.name}
						/>
					))
				) : (
					<div className="flex justify-center p-2">
						<CircularProgress />
					</div>
				)}
			</div>
		</div>
	);
};

export default Lessons;
