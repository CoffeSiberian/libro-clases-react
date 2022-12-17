import { Typography } from "@mui/material";
import DashOptions from "../../components/DashOptios";
import addEmplo from "../../static/img/addEmplo.png";
import addLess from "../../static/img/addLess.png";
import viewGrad from "../../static/img/viewGrad.png";
import rutFormater from "../../helpers/rutFormat";
import usrprofile from "../../static/img/usrprofile.png";
import getTokenData from "../../helpers/getTokenData";

const Director = [
	{
		name: "Empleados",
		href: "/employes",
		img: addEmplo,
		btnColor: "info",
	},
	{
		name: "Cursos",
		href: "/grades",
		img: viewGrad,
		btnColor: "info",
	},
	{
		name: "Materias",
		href: "/lessons",
		img: addLess,
		btnColor: "info",
	},
];

const Teacher = [
	{
		name: "Cursos",
		href: "/grades",
		img: viewGrad,
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
		name: "Cursos",
		href: "/grades",
		img: viewGrad,
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
	const jwt_obj = getTokenData()
	const user_name = jwt_obj.name;
	const user_rank = jwt_obj.rank;
	const user_rut = rutFormater(jwt_obj.rut);

	const rankName = () => {
		switch (user_rank) {
			case 10:
				return "Director";
			case 2:
				return "Inspector";
			case 1:
				return "Profesor";
			default:
				return "";
		}
	};

	return (
		<div className="flex flex-col items-center">
			<div className="flex justify-center items-center flex-col p-3 md:flex-row">
				<img
					className="shadow-xl border-2 border-red-300 rounded-full p-3 w-1/2 md:w-1/6"
					src={usrprofile}
					alt={"profileImg"}
				/>
				<div className="p-3">
					<Typography variant="h5">{user_name}</Typography>
					<Typography variant="h6">{rankName()}</Typography>
					<Typography variant="body1">{user_rut}</Typography>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				{user_rank === 10 ? (
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
				{user_rank === 2 ? (
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
				{user_rank === 1 ? (
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
