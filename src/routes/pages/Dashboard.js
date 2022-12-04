import jwt_decode from "jwt-decode";
import DashOptions from "../../components/DashOptios";
import addEmplo from "../../static/img/addEmplo.png";
import addLess from "../../static/img/addLess.png";
import addStud from "../../static/img/addStud.png";
import viewGrad from "../../static/img/viewGrad.png";

const jwt_obj = jwt_decode(localStorage.getItem("token"));
const name = jwt_obj.name;
const rank = jwt_obj.rank;
const rut = jwt_obj.rut;

const Director = [
	{
		name: "Empleados",
		href: "/employes",
		img: addEmplo,
		btnColor: "info",
	},
	{
		name: "Materias",
		href: "/lessons",
		img: addLess,
		btnColor: "info",
	},
	{
		name: "Cursos",
		href: "/grades",
		img: viewGrad,
		btnColor: "info",
	},
	{
		name: "Alumnos",
		href: "/students",
		img: addStud,
		btnColor: "info",
	},
];

const Teacher = [
	{
		name: "Empleados",
		href: "/employes",
		img: addEmplo,
		btnColor: "info",
	},
	{
		name: "Materias",
		href: "/lessons",
		img: addLess,
		btnColor: "info",
	},
];

const Inspector = [
	{
		name: "Empleados",
		href: "/employes",
		img: addEmplo,
		btnColor: "info",
	},
	{
		name: "Materias",
		href: "/lessons",
		img: addLess,
		btnColor: "info",
	},
];

const Dashboard = () => {
	return (
		<div>
			<div className="flex flex-col md:flex-row">
				{rank === 10 ? (
					Director.map((obj) => (
						<DashOptions
							key={obj.name}
							name={obj.name}
							href={obj.href}
							img={obj.img}
							btnColor={obj.btnColor}
						/>
					))
				) : (
					<></>
				)}
				{rank === 2 ? (
					Inspector.map((obj) => (
						<DashOptions
							key={obj.name}
							name={obj.name}
							href={obj.href}
							img={obj.img}
							btnColor={obj.btnColor}
						/>
					))
				) : (
					<></>
				)}
				{rank === 1 ? (
					Teacher.map((obj) => (
						<DashOptions
							key={obj.name}
							name={obj.name}
							href={obj.href}
							img={obj.img}
							btnColor={obj.btnColor}
						/>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
