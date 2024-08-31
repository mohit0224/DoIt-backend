import jwt from "jsonwebtoken";

const generateToken = (id) => {
	try {
		return jwt.sign({ id }, process.env.JWT_SECRET);
	} catch (err) {
		throw new Error(`Something went wrong, while generating token.`);
	}
};

const verifyToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		throw new Error(`Something went wrong, while verifying token.`);
	}
};

export { generateToken, verifyToken };
