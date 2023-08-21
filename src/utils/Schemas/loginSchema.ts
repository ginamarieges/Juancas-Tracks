import { Joi } from "express-validation";
import { type UserCredentials } from "../../server/controllers/userControllers/types";

const loginSchema = {
  bodi: Joi.object<UserCredentials>({
    password: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

export default loginSchema;
