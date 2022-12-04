import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const DashOptions = ({ name, href, img, btnColor }) => {
	return (
		<div className="flex flex-col items-center space-y-4 p-2 m-3 shadow-xl border-2 border-red-400 rounded-2xl">
			<div className="flex justify-center">
				<img className="rounded-lg w-1/6" src={img} alt={"employe"} />
			</div>
			<div className="text-center">
				<Typography variant="h5">
					{name}
				</Typography>
			</div>
			<div>
				<Link to={href}>
					<Button variant="contained" size="medium" color={btnColor}>
						Ingresar
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default DashOptions;
