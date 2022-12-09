import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import ItemLessons from "../../components/items/ItemLessons";
import CircularProgress from "@mui/material/CircularProgress";
import AddLesson from "../../components/ModalsForms/AddLesson";
import EmpyData from "../../components/EmpyData";

const Lessons = () => {
	const loaded = useRef(false);
	const [listLessons, setListLessons] = useState(false);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
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
			<AddLesson reload={getAllLessons} />
			{!listLessons && !error ? (
				<div className="flex justify-center mt-6">
					<CircularProgress />
				</div>
			) : (
				<></>
			)}
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
					<></>
				)}
			</div>
			<div className="flex w-full justify-center mt-6">
				{error ? <EmpyData msj={"No encontramos resultados"} /> : <></>}
			</div>
		</div>
	);
};

export default Lessons;
