import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ValidUser = ({ localToken, children }) => {
	const [userStatus, setUserStatus] = useState(null);
	const { bodySet } = useFetch(
		`${process.env.REACT_APP_APIURL}/validate`,
		"POST",
		{
			"Authorization": `Bearer ${localToken}`,
		}
	);

	useEffect(() => {
		const validateToken = async (token) => {
			let fetchResponse = await bodySet(token);
			if (fetchResponse.status === 200) return setUserStatus(true);
			return setUserStatus(false);
		};
		validateToken(localToken);
	}, [localToken, bodySet]);

	if (userStatus === false) {
		return <Navigate to={"/login"} replace={true} />;
	} else if (userStatus === null) return <h1>loading...</h1>;
	return children;
};

export default ValidUser;
