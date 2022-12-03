import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ValidUser from "../components/ValidUser";
import { getLocalToken } from "../helpers/validateToken";

const RoutePage = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/dashboard"
					element={
						<ValidUser localToken={getLocalToken()} >
							<Dashboard />
						</ValidUser>
					}
				/>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</Router>
	);
};

export default RoutePage;
