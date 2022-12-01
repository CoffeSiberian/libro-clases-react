import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";

const RoutePage = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</Router>
	);
};

export default RoutePage;
