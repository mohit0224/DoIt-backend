import "dotenv/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import corsOption from "./config/cors.config.js";
import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// ----------------------------------------------------------------
// ----------------------------------------------------------------

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

export default app;
