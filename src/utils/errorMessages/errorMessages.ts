import CustomError from "../../CustomError/CustomError.js";
import type ErrorMessagesStructure from "./types";

const errorMessages: ErrorMessagesStructure = {
  notFound: new CustomError("Endpoint not found", 404),
  notCreated: new CustomError("Error creating account", 400),
  wrongCredentials: new CustomError("Wrong credentials", 401),
  serverError: new Error("Server error"),
};

export default errorMessages;
