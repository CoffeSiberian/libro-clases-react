import { useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ValidUser = ({ localToken, children }) => {
	const { bodySet } = useFetch(
		`${process.env.REACT_APP_APIURL}/validate`,
		"POST",
		{
			Authorization: `Bearer ${localToken}`,
		}
	);
	const loaded = useRef(false);
	const aut = useRef(null);

	const validateToken = async () => {
		let fetchResponse = await bodySet();
		if (fetchResponse.status === 200) return (aut.current = true);
		return (aut.current = false);
	};
	
	useEffect(() => {
		if (!loaded.current) {
			validateToken();
			loaded.current = true;
		}
	}, []);

	if (aut.current === false) {
		return <Navigate to={"/login"} replace={true} />;
	} else if (aut.current === null) return <h1>loading...</h1>;
	return children;
};

export default ValidUser;
