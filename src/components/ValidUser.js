import { Navigate } from "react-router-dom";
import useValidUser from "../hooks/useValidUser";
import ModalLoading from "./ModalLoading";

const ValidUser = ({ children }) => {
	const [loading, aut] = useValidUser();
	if (aut === false) {
		return <Navigate to={"/login"} replace={true} />;
	} else if (aut === null) return <ModalLoading open={loading} />;
	return children;
};

export default ValidUser;
