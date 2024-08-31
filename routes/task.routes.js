import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import {
	createTask,
	deleteTask,
	getAllTasks,
	getCompletedTask,
	getImportantTask,
	getTodayTask,
	isCompleted,
	isImportant,
} from "../controllers/task.controller.js";
const taskRouter = Router();

taskRouter.post("/", isLoggedIn, createTask);
taskRouter.delete("/:id", isLoggedIn, deleteTask);

taskRouter.put("/iscompleted/:id", isLoggedIn, isCompleted);
taskRouter.put("/isimportant/:id", isLoggedIn, isImportant);

taskRouter.get("/", isLoggedIn, getAllTasks);
taskRouter.get("/get-today-task", isLoggedIn, getTodayTask);
taskRouter.get("/get-completed-tasks", isLoggedIn, getCompletedTask);
taskRouter.get("/get-important-tasks", isLoggedIn, getImportantTask);

export default taskRouter;
