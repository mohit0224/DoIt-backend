import app from "./app.js";
import dbConnect from "./config/dbConnect.config.js";
const PORT = process.env.PORT || 8080;

dbConnect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`server listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
