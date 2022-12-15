import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../static/img/testlogo.webp";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
	const social = [
		{
			name: "LinkedIn",
			logo: <LinkedInIcon />,
			link: "https://www.linkedin.com/in/fernando-garrido-b31196236/",
		},
	];

	return (
		<div className="mt-auto mb-4">
			<Paper elevation={24} sx={{ bgcolor: "rgb(200 130 11)" }}>
				<div className="flex justify-center p-2 drop-shadow-md">
					<img className="h-auto w-10 mr-2 rounded-lg" src={logo} alt="logo" />
					<Typography variant="h4">Sistema Escolar</Typography>
				</div>
				<div className="flex justify-center p-2">
					<Typography>Administración escolar para la&nbsp;</Typography>
					<Typography color="error">Educación&nbsp;</Typography>
					<VerifiedUserIcon color="secondary" />
				</div>
				<div className="flex justify-center mb-3 mt-3">
					<ul className="justify-end md:inline-flex">
						{social.map((obj) => (
							<li className="mr-3 ml-3" key={obj.name}>
								<Link
									className="flex justify-start md:justify-center items-center p-2"
									color="white"
									href={obj.link}
									target="_blank"
									underline="none"
								>
									{obj.logo}
									<Typography color="white" variant="subtitle2">
										{obj.name}
									</Typography>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="flex justify-center mb-2">
					<Link
						className="flex justify-center items-center p-2"
						color="black"
						href="https://github.com/CoffeSiberian"
						target="_blank"
						underline="none"
					>
						<Typography variant="caption" color="black">
							by: SiberianCoffe
						</Typography>
						<GitHubIcon />
					</Link>
				</div>
			</Paper>
		</div>
	);
};

export default Footer;
