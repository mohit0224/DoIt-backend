import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		task: {
			type: "String",
			trim: true,
			required: true,
		},
		isCompleted: {
			type: "Boolean",
			default: false,
		},
		isImportant: {
			type: "Boolean",
			default: false,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
