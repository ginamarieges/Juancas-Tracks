import { Joi } from "express-validation";
import { type UserCredentials } from "../../server/controllers/userControllers/types";

const loginSchema = {
  body: Joi.object<UserCredentials>({
    password: Joi.string().required(),
    username: Joi.string().required().min(5).max(12),
  }),
};

export default loginSchema;
