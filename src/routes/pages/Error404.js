import { Typography } from "@mui/material";

const Error404 = () => {
	return (
		<div className="flex justify-center mt-auto">
			<div className="flex-col ml-2 mr-2 md:w-2/4 border-4 border-red-700 border-solid rounded-xl bg-red-300 shadow-2xl">
				<div className="flex justify-center">
					<Typography color="inherit" variant="h4">
						Error&nbsp;
					</Typography>
					<Typography color="red" variant="h4">
						404
					</Typography>
				</div>
				<Typography className="text-center" color="inherit" variant="h4">
					No encontramos lo que buscas
				</Typography>
			</div>
		</div>
	);
};

export default Error404;
