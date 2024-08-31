import Task from "../models/task.models.js";
import User from "../models/user.models.js";
import { taskValidation } from "../schema/task.schema.js";
import { httpError, httpResponse } from "../utils/httpRes.utils.js";

const createTask = async (req, res) => {
	try {
		const data = req.body;
		const { error } = taskValidation(data);
		if (error) {
			return res.status(404).json(httpError(error.details[0].message, false));
		}

		const newTask = new Task({ ...data, user: req.user.id });

		await User.findByIdAndUpdate(req.user.id, {
			$push: { task: newTask._id },
		});

		await newTask.save();

		res
			.status(200)
			.json(httpResponse("Task created successfully!!", true, newTask));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const getAllTasks = async (req, res) => {
	try {
		const getAllTasks = await Task.find({
			user: req.user.id,
		});

		res.status(200).json(httpResponse("Get all tasks !!", true, getAllTasks));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const isCompleted = async (req, res) => {
	try {
		const { id } = req.params;
		const { isCompleted } = req.body;

		const updatedTask = await Task.findByIdAndUpdate(
			id,
			{ isCompleted },
			{ new: true }
		);

		if (!updatedTask) {
			return res.status(404).json(httpError("Task not found", false));
		}

		res
			.status(200)
			.json(httpResponse("Task has been updated !!", true, updatedTask));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const isImportant = async (req, res) => {
	try {
		const { id } = req.params;
		const { isImportant } = req.body;

		const updatedTask = await Task.findByIdAndUpdate(
			id,
			{ isImportant },
			{ new: true }
		);

		if (!updatedTask) {
			return res.status(404).json(httpError("Task not found", false));
		}

		res
			.status(200)
			.json(httpResponse("Task has been updated !!", true, updatedTask));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const getCompletedTask = async (req, res) => {
	try {
		const completedTasks = await Task.find({
			$and: [{ isCompleted: true }, { user: req.user.id }],
		});

		res
			.status(200)
			.json(httpResponse("Get all completed tasks !!", true, completedTasks));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const getImportantTask = async (req, res) => {
	try {
		const importantTasks = await Task.find({
			$and: [
				{ isImportant: true },
				{ user: req.user.id },
				// { isCompleted: false },
			],
		});

		res
			.status(200)
			.json(httpResponse("Get all important tasks !!", true, importantTasks));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const getTodayTask = async (req, res) => {
	try {
		const startOfDay = new Date();
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date();
		endOfDay.setHours(23, 59, 59, 999);

		const todayTask = await Task.find({
			$and: [
				{ createdAt: { $gte: startOfDay, $lt: endOfDay } },
				{ user: req.user.id },
				{ isCompleted: false },
			],
		});

		res
			.status(200)
			.json(httpResponse("Get all important tasks !!", true, todayTask));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

const deleteTask = async (req, res) => {
	try {
		await Task.findByIdAndDelete(req.params.id);
		res.status(200).json(httpResponse("Get all important tasks !!", true, {}));
	} catch (err) {
		return res.status(500).json(httpError(err.message, false));
	}
};

export {
	createTask,
	getAllTasks,
	isCompleted,
	isImportant,
	getCompletedTask,
	getImportantTask,
	getTodayTask,
	deleteTask,
};
