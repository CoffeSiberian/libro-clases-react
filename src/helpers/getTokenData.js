import jwt_decode from "jwt-decode";

const getTokenData = () => {
	try {
		let jwt_obj = jwt_decode(localStorage.getItem("token"));
		let rut = jwt_obj.rut;
		let name = jwt_obj.name;
		let rank = jwt_obj.rank;
		return { rut, name, rank };
	} catch {
		let rut = "";
		let name = "";
		let rank = "";
		return { rut, name, rank };
	}
};

export default getTokenData;
