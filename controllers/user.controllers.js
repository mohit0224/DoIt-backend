import { signupValidation, loginValidation } from "../schema/user.schema.js";
import { httpError, httpResponse } from "../utils/httpRes.utils.js";
import User from "../models/user.models.js";
import { generateToken } from "../utils/jwt.utils.js";

const cookieOption = {
	httpOnly: true,
	secure: true,
	sameSite: "Strict",
	// domain: "http://localhost:5173/",
	maxAge: 1 * 60 * 60 * 1000,
};

const createAccount = async (req, res) => {
	try {
		const data = req.body;
		const { error } = signupValidation(data);
		if (error) {
			return res.status(400).json(httpError(error.details[0].message, false));
		}

		const existsUSer = await User.findOne({ email: data.email });
		if (existsUSer) {
			return res.status(409).json(httpError("Email already exists !!", false));
		}

		const newUser = new User({ ...data });
		await newUser.save();

		res.status(201).json(httpResponse("user created !!", true, {}));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const loginAccount = async (req, res) => {
	try {
		const data = req.body;
		const { error } = loginValidation(data);
		if (error) {
			return res.status(500).json(httpError(error.details[0].message, false));
		}

		const checkUser = await User.findOne({ email: data.email });
		if (!checkUser) {
			return res.status(404).json(httpError("User not found !!", false));
		}

		const checkPassword = await checkUser.isPasswordCorrect(data.password);
		if (!checkPassword) {
			return res.status(404).json(httpError("Invalid credentials !!", false));
		}

		const token = generateToken(checkUser._id);

		res
			.cookie("token", token, cookieOption)
			.status(200)
			.json(httpResponse("LoggedIn successfully !!", true, token));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const logoutAccount = async (req, res) => {
	try {
		res
			.clearCookie("token")
			.status(200)
			.json(httpResponse("Logged out successfully !!", true, {}));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const checkCookies = (req, res) => {
	if (req.cookies.token) {
		res.json({ cookieExists: true });
	} else {
		res.json({ cookieExists: false });
	}
};

const getCurrentUser = async (req, res) => {
	try {
		const currentUser = await User.findOne({ _id: req.user.id }).select(
			"-password -task -__v"
		);
		res
			.status(200)
			.json(httpResponse("Get current user !!", true, currentUser));
	} catch (err) {
		res.status(500).json(httpError(err.message, false));
	}
};

export {
	createAccount,
	loginAccount,
	logoutAccount,
	checkCookies,
	getCurrentUser,
};
