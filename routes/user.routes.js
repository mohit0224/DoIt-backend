import { Router } from "express";
import {
	checkCookies,
	createAccount,
	getCurrentUser,
	loginAccount,
	logoutAccount,
} from "../controllers/user.controllers.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
const userRouter = Router();

userRouter.post("/", createAccount);
userRouter.post("/login", loginAccount);
userRouter.post("/logout", isLoggedIn, logoutAccount);
userRouter.get("/check-cookie", checkCookies);
userRouter.get("/current-user", isLoggedIn, getCurrentUser);

export default userRouter;
