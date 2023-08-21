import { Router } from "express";
import { validate } from "express-validation";
import { paths } from "../../paths/paths.js";
import {
  loginUser,
  registerUser,
} from "../../controllers/userControllers/userControllers.js";
import registerSchema from "../../../utils/Schemas/registerSchema.js";
import loginSchema from "../../../utils/Schemas/loginSchema.js";

const userRouter = Router();

userRouter.post(
  paths.register,
  validate(registerSchema, {}, { abortEarly: false }),
  registerUser,
);

userRouter.post(
  paths.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser,
);

export default userRouter;
