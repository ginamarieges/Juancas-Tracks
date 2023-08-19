import "../../../loadEnvironment.js";
import createDebug from "debug";
import { ValidationError } from "express-validation";
import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../../CustomError/CustomError";
import errorMessages from "../../../utils/errorMessages/errorMessages.js";

const debug = createDebug(
  "juancas-tracks-api:server:middlewares:errorMiddlewares:errorMiddlewares.ts",
);

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ValidationError && error.details.body) {
    const validationError = error.details.body
      .map((joiError) => joiError.message)
      .join(" & ")
      .replaceAll("'", "");

    (error as CustomError).publicMessage = validationError;
    debug(validationError);
  }

  debug(error.message);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.publicMessage : "General error";

  res.status(statusCode).json({ message });
};

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const customError = errorMessages.notFound;
  next(customError);
};
