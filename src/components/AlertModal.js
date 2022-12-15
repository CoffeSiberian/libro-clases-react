import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertModal = ({ title, description, handleClose, open }) => {
	return (
		<div>
			<Dialog
				open={open}
				keepMounted
				onClose={handleClose}
				aria-describedby="alertInfo"
				scroll={"paper"}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ wordBreak: "break-word" }} id="alertInfo">
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AlertModal;
