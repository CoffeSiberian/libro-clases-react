import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import ItemEmployee from "../../components/items/ItemEmployee";
import AddEmployee from "../../components/ModalsForms/AddEmployee";
import CircularProgress from "@mui/material/CircularProgress";
import EmpyData from "../../components/EmpyData";

const Employes = () => {
	const loaded = useRef(false);
	const [listEmployees, setListEmployees] = useState(false);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/getallemployee`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getEmployees = async () => {
		let fetchResponse = await bodySet();
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
		<div>
			<AddEmployee reload={getEmployees} />
			{!listEmployees && !error ? (
				<div className="flex justify-center mt-6">
					<CircularProgress />
				</div>
			) : (
				<></>
			)}
			<div className="grid md:grid-cols-2">
				{listEmployees !== false ? (
					listEmployees.map((data) => (
						<ItemEmployee
							key={data.rut}
							name={data.name}
							rut={data.rut}
							rank={data.rank}
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

export default Employes;
