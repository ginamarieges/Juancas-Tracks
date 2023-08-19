import { type NextFunction, type Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../../../database/models/User.js";
import {
  type UserInformation,
  type CustomRequest,
  type UserData,
  type CustomRequestLogin,
  type UserCredentials,
} from "../types.js";
import { loginUser, registerUser } from "../userControllers.js";
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

describe("Given a loginUser controller", () => {
  const userCredentials: UserCredentials = {
    username: "gingi",
    password: "andele",
  };
  const req: Partial<CustomRequestLogin> = {
    body: userCredentials,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const mockedUser: Partial<UserInformation> = {
    username: "gingi",
    password: "andele",
    _id: new Types.ObjectId().toString(),
  };
  const token = "d3nehr943d8ehj3948jfd239frjdx";
  describe("When it receives a valid Gina's username and password", () => {
    test("Then it should call status mthod with 200", async () => {
      const expectedStatus = 200;
      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedUser),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(
        req as CustomRequestLogin,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with the token", async () => {
      await loginUser(
        req as CustomRequestLogin,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives an invalid Gina's data", () => {
    test("Then it should call the next function with the error 'Wrong credentials'", async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const expectedError = errorMessages.wrongCredentials;

      await loginUser(
        req as CustomRequestLogin,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
