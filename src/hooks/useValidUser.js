import { useRef, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { getLocalToken } from "../helpers/validateToken";

const useValidUser = () => {
	// eslint-disable-next-line
	const [loading, error, succes, bodySet, setError, setSucces] = useFetch(
		`${process.env.REACT_APP_APIURL}/validate`,
		"POST",
		{
			Authorization: `Bearer ${getLocalToken()}`,
		}
	);
	const loaded = useRef(false);
	//const aut = useRef(null);
	const [aut, setAut] = useState(null);

	const validateToken = async () => {
		if (!getLocalToken()) return setAut(false);
		let fetchResponse = await bodySet();
		if (fetchResponse.status === 200) return setAut(true);
		return setAut(false);
	};

	useEffect(() => {
		if (!loaded.current) {
			validateToken();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return [loading, aut];
};

export default useValidUser;
