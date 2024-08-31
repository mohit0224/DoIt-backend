import { httpError } from "../utils/httpRes.utils.js";
import { verifyToken } from "../utils/jwt.utils.js";

const isLoggedIn = (req, res, next) => {
	const { token } = req.cookies;

	if (token) {
		const checkToken = verifyToken(token);

		if (checkToken) {
			req.user = checkToken;
			next();
		}
	} else {
		return res
			.status(404)
			.json(httpError("Invalid token or token not found", false));
	}
};

export default isLoggedIn;
