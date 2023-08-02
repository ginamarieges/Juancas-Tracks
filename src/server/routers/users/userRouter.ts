import { Router } from "express";
import { paths } from "../../paths/paths.js";
import { registerUser } from "../../controllers/userControllers/userControllers.js";

const userRouter = Router();

userRouter.post(paths.register, registerUser);

export default userRouter;
