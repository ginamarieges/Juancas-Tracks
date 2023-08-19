import { type NextFunction, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
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

export const loginUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = errorMessages.wrongCredentials;
      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "100d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
