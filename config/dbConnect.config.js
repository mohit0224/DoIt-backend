import mongoose from "mongoose";
import envConfig from "./env.config.js";

const dbConnect = async () => {
	try {
		const { connections } = await mongoose.connect(envConfig.MONGODB_URI, {
			dbName: envConfig.MONGODB_NAME,
		});
		if (connections[0].readyState === 1) {
			console.log(
				`Database connection established on host ${connections[0].host} `
			);
		}
	} catch (err) {
		throw new Error(err.message);
	}
};

export default dbConnect;
