import bcrypt from "bcrypt";
import envConfig from "../config/env.config.js";

const hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(envConfig.BCRYPT_SALT);
		return await bcrypt.hash(password, salt);
	} catch (err) {
		throw new Error(`Bcrypt hash :: something went wrong !!`);
	}
};

const verifyPassword = async (password, hashPassword) => {
	try {
		return await bcrypt.compare(password, hashPassword);
	} catch (error) {
		throw new Error(`Bcrypt verify :: something went wrong !!`);
	}
};

export { hashPassword, verifyPassword };
