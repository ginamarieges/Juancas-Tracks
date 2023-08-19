import { Router } from "express";
import { paths } from "../../paths/paths.js";
import {
  loginUser,
  registerUser,
} from "../../controllers/userControllers/userControllers.js";

const userRouter = Router();

userRouter.post(paths.register, registerUser);

userRouter.post(paths.login, loginUser);

export default userRouter;
