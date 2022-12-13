import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import CircularProgress from "@mui/material/CircularProgress";
import EmpyData from "../../components/EmpyData";
import ItemStudentQualifi from "../../components/items/ItemStudentQualifi";

const Qualification = () => {
	const { rut, idLesson } = useParams();

	const loaded = useRef(false);
	const gradeName = useRef();
	const [listQualification, setListQualification] = useState(false);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/getstudent/${rut}/${idLesson}`,
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
			gradeName.current = await data.name;
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
			{!listQualification && !error ? (
				<div className="flex justify-center mt-6">
					<CircularProgress />
				</div>
			) : (
				<></>
			)}
			<div className="grid md:grid-cols-2">
				{listQualification !== false && !error ? (
					listQualification.Students.map((data) => (
						<ItemStudentQualifi
							key={data.rut}
							rut={data.rut}
							name={data.name}
							lessonId={idLesson}
						/>
					))
				) : (
					<></>
				)}
			</div>
			<div className="flex w-full justify-center mt-6">
				{error ? <EmpyData msj={"No encontramos resultados"} /> : <></>}
				{listQualification !== false &&
				listQualification.Students.length === 0 ? (
					<EmpyData msj={"No encontramos estudiantes"} />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Qualification;
