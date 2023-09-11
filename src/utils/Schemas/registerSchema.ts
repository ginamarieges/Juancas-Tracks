import { Joi } from "express-validation";
import { type UserData } from "../../server/controllers/userControllers/types";

const registerSchema = {
  body: Joi.object<UserData>({
    lastname: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required().min(5).max(12),
  }),
};

export default registerSchema;
