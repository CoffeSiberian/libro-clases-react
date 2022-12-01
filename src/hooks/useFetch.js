import { useState } from "react";
import { putFetch } from "../helpers/dataFetch";

const useFetch = (url) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [succes, setSucces] = useState(false);

	const putData = async (bodyObj) => {
		setLoading(true);
		let dataResponse = await putFetch(
			bodyObj,
			{ "Content-Type": "application/json" },
			url
		);
		if (!(await dataResponse.ok)) {
			setError(true);
		} else setSucces(true);
		setLoading(false);
		return dataResponse;
	};
	const bodySet = async (obj) => {
		return await putData(JSON.stringify(obj));
	};
	return { loading, error, succes, bodySet, setError, setSucces };
};

export default useFetch;
