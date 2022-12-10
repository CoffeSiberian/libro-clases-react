import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import CircularProgress from "@mui/material/CircularProgress";
import EmpyData from "../../components/EmpyData";
import ItemGrades from "../../components/items/ItemGrades";
import AddGrade from "../../components/ModalsForms/AddGrades";

const Grades = () => {
	const loaded = useRef(false);
	const [listGrades, setListGrades] = useState(false);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/getallgrades`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getGrades = async () => {
		let fetchResponse = await bodySet();
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
		<div>
			<AddGrade reload={getGrades} />
			{!listGrades && !error ? (
				<div className="flex justify-center mt-6">
					<CircularProgress />
				</div>
			) : (
				<></>
			)}
			<div className="grid md:grid-cols-2">
				{listGrades !== false ? (
					listGrades.map((data) => (
						<ItemGrades
							key={data.id}
							id={data.id}
							name={data.name}
							count={data.count}
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

export default Grades;