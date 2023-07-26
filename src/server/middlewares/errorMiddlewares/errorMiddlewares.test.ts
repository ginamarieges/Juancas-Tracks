import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorMiddlewares.js";
import errorMessages from "../../../utils/errorMessages/errorMessages.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware,", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives an error with code 403 and message 'Forbidden'", () => {
    const error = new CustomError("Forbidden", 403);
    test("Then it should call the method status with status code 403", () => {
      const expectedStatus = 403;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with the message", () => {
      const expectedMessage = "Forbidden";

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives an error with no status code", () => {
    const error = new Error();
    test("Then it should return the code 500", () => {
      const expectedStatus = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method status with the message 'General error'", () => {
      const expectedMessage = "General error";

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it should call the next function with the error 404 'Endpoint not found'", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError = errorMessages.notFound;

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
