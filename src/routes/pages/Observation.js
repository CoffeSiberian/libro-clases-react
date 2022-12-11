import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import CircularProgress from "@mui/material/CircularProgress";
import EmpyData from "../../components/EmpyData";
import ItemObservation from "../../components/items/ItemObservation";
import AddObservation from "../../components/ModalsForms/AddObservation";

const Observation = () => {
	const { rut } = useParams();

	const loaded = useRef(false);
	const name = useRef();
	const grade = useRef();
	const [listObservation, setListObservation] = useState(false);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/getobservations/${rut}`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getObservation = async () => {
		let fetchResponse = await bodySet();
		if (fetchResponse.status === 200) {
			let data = await fetchResponse.json();
			name.current = await data.name;
			grade.current = await data.Grade.id;
			return setListObservation(await data);
		}
		return setListObservation(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			getObservation();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<div>
			<AddObservation
				reload={getObservation}
				rut={rut}
				name={name.current}
				gradeId={grade.current}
			/>
			{!listObservation && !error ? (
				<div className="flex justify-center mt-6">
					<CircularProgress />
				</div>
			) : (
				<></>
			)}
			<div className="grid md:grid-cols-2">
				{listObservation !== false && !error ? (
					listObservation.Observations.map((data) => (
						<ItemObservation
							key={data.id}
							observation={data.observation}
							date={data.createdAt}
						/>
					))
				) : (
					<></>
				)}
			</div>
			<div className="flex w-full justify-center mt-6">
				{error ? <EmpyData msj={"No encontramos resultados"} /> : <></>}
                {listObservation !== false && listObservation.Observations.length === 0 ? (
					<EmpyData msj={"No encontramos observaciones"} />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Observation;
