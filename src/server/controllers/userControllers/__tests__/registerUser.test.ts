import { type NextFunction, type Response } from "express";
import { User } from "../../../../database/models/User.js";
import { type CustomRequest, type UserData } from "../types.js";
import { registerUser } from "../userControllers.js";
import errorMessages from "../../../../utils/errorMessages/errorMessages.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const userData: UserData = {
  lastname: "Marieges",
  name: "Gina",
  password: "andele",
  username: "gingi",
};

describe("Given a registerUser controller", () => {
  const req: Partial<CustomRequest> = {
    body: userData,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives Gina's data", () => {
    test("Then it should status method with code 201", async () => {
      const expectedStatus = 201;

      User.create = jest.fn().mockResolvedValue(userData);

      await registerUser(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with Gina's data", async () => {
      User.create = jest.fn().mockResolvedValue(userData);

      await registerUser(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ newUser: userData });
    });
  });

  describe("When it receives an invalid user data", () => {
    test("Then it should call the next function with the error 'Error creating account'", async () => {
      const expectedError = errorMessages.notCreated;

      User.create = jest.fn().mockResolvedValue(null);

      await registerUser(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
