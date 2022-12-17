import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getLocalToken } from "../../helpers/validateToken";
import CircularProgress from "@mui/material/CircularProgress";
import ItemSchedule from "../../components/items/ItemScheduler";
import EmpyData from "../../components/EmpyData";
import AddScheduler from "../../components/ModalsForms/AddScheduler";
import SchedulerBar from "../../components/ModalsForms/SchedulerBar";
import getTokenData from "../../helpers/getTokenData";

const Scheduler = () => {
	const { id } = useParams();

	const loaded = useRef(false);
	const [listScheduler, setListScheduler] = useState(false);

	const jwt_obj = getTokenData();
	const user_rank = jwt_obj.rank;

	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/getLessonSchedule/${id}`,
		"GET",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);

	const getScheduler = async () => {
		let fetchResponse = await bodySet();
		if (fetchResponse.status === 200) {
			return setListScheduler(await fetchResponse.json());
		}
		return setListScheduler(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			getScheduler();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<div>
			{user_rank === 1 || user_rank === 2 ? (
				<SchedulerBar />
			) : (
				<AddScheduler reload={getScheduler} id={id} />
			)}

			{!listScheduler && !error ? (
				<div className="flex justify-center mt-6">
					<CircularProgress />
				</div>
			) : (
				<></>
			)}
			<div className="grid md:grid-cols-2">
				{listScheduler !== false && !error ? (
					listScheduler.map((data) => (
						<ItemSchedule
							key={data.id}
							id={data.id}
							name={data.Lesson.name}
							grade={data.Lesson.Grade.name}
							dateStart={data.startAt}
							dateEnd={data.endAt}
							objetive={data.objective}
							reload={getScheduler}
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

export default Scheduler;
