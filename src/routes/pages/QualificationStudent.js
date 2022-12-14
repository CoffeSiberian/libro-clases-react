import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import CircularProgress from "@mui/material/CircularProgress";
import EmpyData from "../../components/EmpyData";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ItemStudentQualifi from "../../components/items/ItemStudentQualifi";

const QualificationStudent = () => {
	const { idLesson, gradeId } = useParams();
	const navigate = useNavigate();
	const loaded = useRef(false);
	const gradeName = useRef();
	const [listStudent, setListStudent] = useState(false);

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/getstudent/${gradeId}`,
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
			<Typography className="md:hidden flex justify-center" variant="h5">
				Estudiantes {gradeName.current}
			</Typography>
			<div className="flex items-center justify-between mt-3 mr-3">
				<Typography
					className="hidden md:flex absolute w-full justify-center"
					variant="h5"
				>
					Estudiantes {gradeName.current}
				</Typography>
				<IconButton
					aria-label="delete"
					onClick={() => navigate("/lessons", { replace: true })}
				>
					<ArrowBackIcon />
				</IconButton>
			</div>
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
				{listStudent !== false && listStudent.Students.length === 0 ? (
					<EmpyData msj={"No encontramos estudiantes"} />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default QualificationStudent;
