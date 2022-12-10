import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error404";
import ValidUser from "../components/ValidUser";
import Heder from "../components/Heder";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employes from "./pages/Employees";
import Lessons from "./pages/Lessons";
import Scheduler from "./pages/Scheduler";
import Grades from "./pages/Grades";
import Student from "./pages/Students";

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
				<Route
					path="/lessons"
					element={
						<ValidUser>
							<Heder />
							<Lessons />
						</ValidUser>
					}
				/>
				<Route
					path="/scheduler/:id"
					element={
						<ValidUser>
							<Heder />
							<Scheduler />
						</ValidUser>
					}
				/>
				<Route
					path="/grades"
					element={
						<ValidUser>
							<Heder />
							<Grades />
						</ValidUser>
					}
				/>
				<Route
					path="/students/:id"
					element={
						<ValidUser>
							<Heder />
							<Student />
						</ValidUser>
					}
				/>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</Router>
	);
};

export default RoutePage;
