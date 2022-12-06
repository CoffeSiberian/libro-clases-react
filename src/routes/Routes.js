import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error404";
import ValidUser from "../components/ValidUser";
import Heder from "../components/Heder";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employes from "./pages/Employees";

const RoutePage = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/dashboard"
					element={
						<ValidUser>
							<Heder />
							<Dashboard />
						</ValidUser>
					}
				/>				
				<Route
				path="/employes"
				element={
					<ValidUser>
						<Heder />
						<Employes />
					</ValidUser>
				}
			/>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</Router>
	);
};

export default RoutePage;
