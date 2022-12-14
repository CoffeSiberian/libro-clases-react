import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import CircularProgress from "@mui/material/CircularProgress";
import EmpyData from "../../components/EmpyData";
import ItemQualification from "../../components/items/ItemQualification";
import AddQualification from "../../components/ModalsForms/AddQualification";

const Qualification = () => {
	const { rut, idLesson } = useParams();

	const loaded = useRef(false);
	const lessonName = useRef();
	const gradeId = useRef();
	const [listQualification, setListQualification] = useState(false);
	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/getqualification/${rut}/${idLesson}`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getQualification = async () => {
		let fetchResponse = await bodySet();
		if (fetchResponse.status === 200) {
			let data = await fetchResponse.json();
			lessonName.current = data.name;
			gradeId.current = data.Grade.id;
			return setListQualification(await data);
		}
		return setListQualification(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			getQualification();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<div>
			<AddQualification
				reload={getQualification}
				rut={rut}
				lessonName={lessonName.current}
				lessonId={idLesson}
				gradeId={gradeId.current}
			/>
			{!listQualification && !error ? (
				<div className="flex justify-center mt-6">
					<CircularProgress />
				</div>
			) : (
				<></>
			)}
			<div className="grid md:grid-cols-2">
				{listQualification !== false && !error ? (
					listQualification.Qualifications.map((data) => (
						<ItemQualification key={data.id} id={data.id} score={data.score} />
					))
				) : (
					<></>
				)}
			</div>
			<div className="flex w-full justify-center mt-6">
				{error ? <EmpyData msj={"No encontramos resultados"} /> : <></>}
				{listQualification !== false &&
				listQualification.Qualifications.length === 0 ? (
					<EmpyData msj={"No encontramos estudiantes"} />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Qualification;
