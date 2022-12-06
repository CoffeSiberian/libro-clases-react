import { useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getLocalToken } from "../helpers/validateToken";
import ModalLoading from "./ModalLoading";

const ValidUser = ({ children }) => {
	const { bodySet, loading } = useFetch(
		`${process.env.REACT_APP_APIURL}/validate`,
		"POST",
		{
			Authorization: `Bearer ${getLocalToken()}`,
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
		} // eslint-disable-next-line
	}, []);

	if (aut.current === false) {
		return <Navigate to={"/login"} replace={true} />;
	} else if (aut.current === null) return <ModalLoading open={loading} />;
	return children;
};

export default ValidUser;
