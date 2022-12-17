import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import CircularProgress from "@mui/material/CircularProgress";
import EmpyData from "../../components/EmpyData";
import ItemStudent from "../../components/items/ItemStudent";
import AddStudent from "../../components/ModalsForms/AddStudent";
import StudentsBar from "../../components/ModalsForms/StudentsBar";
import getTokenData from "../../helpers/getTokenData";

const Student = () => {
	const { id } = useParams();

	const loaded = useRef(false);
	const gradeName = useRef();
	const [listStudent, setListStudent] = useState(false);

	const jwt_obj = getTokenData();
	const user_rank = jwt_obj.rank;

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/getstudent/${id}`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getStudent = async () => {
		let fetchResponse = await bodySet();
		if (fetchResponse.status === 200) {
			let data = await fetchResponse.json();
			gradeName.current = await data.name;
			return setListStudent(await data);
		}
		return setListStudent(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			getStudent();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<div>
			{user_rank === 1 || user_rank === 2 ? (
				<StudentsBar gradeName={gradeName.current} />
			) : (
				<AddStudent
					reload={getStudent}
					gradeId={id}
					gradeName={gradeName.current}
				/>
			)}
			{!listStudent && !error ? (
				<div className="flex justify-center mt-6">
					<CircularProgress />
				</div>
			) : (
				<></>
			)}
			<div className="grid md:grid-cols-2">
				{listStudent !== false && !error ? (
					listStudent.Students.map((data) => (
						<ItemStudent key={data.rut} rut={data.rut} name={data.name} />
					))
				) : (
					<></>
				)}
			</div>
			<div className="flex w-full justify-center mt-6">
				{error ? <EmpyData msj={"No encontramos resultados"} /> : <></>}
				{listStudent !== false && listStudent.Students.length === 0 ? (
					<EmpyData msj={"No encontramos estudiantes"} />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Student;
