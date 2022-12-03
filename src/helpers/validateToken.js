const getLocalToken = () => {
	let token = localStorage.getItem("token");
	if (token !== null) return token;
	return false;
};

export { getLocalToken };
