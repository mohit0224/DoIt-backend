import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/bcrypt.utils.js";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: "String",
			required: true,
			trim: true,
		},
		email: {
			type: "String",
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: "String",
			required: true,
		},
		task: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
			},
		],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next();
	this.password = await hashPassword(this.password);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await verifyPassword(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
