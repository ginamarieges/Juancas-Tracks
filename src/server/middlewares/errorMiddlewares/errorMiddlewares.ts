import "../../../loadEnvironment.js";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../../CustomError/CustomError";

const debug = createDebug(
  "juancas-tracks-api:server:middlewares:errorMiddlewares:errorMiddlewares.ts",
);

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  debug(error.message);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.publicMessage : "General error";

  res.status(statusCode).json({ message });
};
