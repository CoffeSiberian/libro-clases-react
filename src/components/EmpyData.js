import Alert from "@mui/material/Alert";

const EmpyData = ({ msj }) => {
	return (
		<div>
			<Alert variant="filled" severity="warning">
				{msj}
			</Alert>
		</div>
	);
};

export default EmpyData;
