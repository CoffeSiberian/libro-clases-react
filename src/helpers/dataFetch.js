const dataFetch = async (body = null, method, headers, url) => {
	let optiosFetch = {
		method: method,
		headers: headers,
		body: body,
	};

	try {
		return await fetch(url, optiosFetch);
	} catch (err) {
		return err.message;
	}
};

const getFetch = async (body = null, headers, url) => {
	return await dataFetch(body, "GET", headers, url);
};

const putFetch = async (body = null, headers, url) => {
	return await dataFetch(body, "PUT", headers, url);
};

export { getFetch, putFetch };
