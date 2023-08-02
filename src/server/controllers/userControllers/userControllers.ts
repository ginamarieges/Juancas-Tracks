import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import { type CustomRequest } from "./types.js";
import { User } from "../../../database/models/User.js";
import errorMessages from "../../../utils/errorMessages/errorMessages.js";

export const registerUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { lastname, name, password, username } = req.body;

  try {
    const newUser = await User.create({
      name,
      lastname,
      username,
      password: await bcrypt.hash(password, 10),
    });

    if (!newUser) {
      throw errorMessages.notCreated;
    }

    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
};
