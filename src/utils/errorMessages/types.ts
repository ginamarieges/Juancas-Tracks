import type CustomError from "../../CustomError/CustomError.js";

interface ErrorMessagesStructure {
  notFound: CustomError;
  notCreated: CustomError;
  wrongCredentials: CustomError;
  serverError: Error;
}

export default ErrorMessagesStructure;
