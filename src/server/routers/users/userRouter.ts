import { Router } from "express";
import { validate } from "express-validation";
import { paths } from "../../paths/paths.js";
import {
  loginUser,
  registerUser,
} from "../../controllers/userControllers/userControllers.js";
import registerSchema from "../../../utils/Schemas/registerSchema.js";

const userRouter = Router();

userRouter.post(
  paths.register,
  validate(registerSchema, {}, { abortEarly: false }),
  registerUser,
);

userRouter.post(paths.login, loginUser);

export default userRouter;
