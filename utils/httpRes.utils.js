const httpResponse = (message, success, data) => {
	return { message, success, data };
};

const httpError = (message, success) => {
	return { message, success };
};

export { httpResponse, httpError };
