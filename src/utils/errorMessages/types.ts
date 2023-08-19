import type CustomError from "../../CustomError/CustomError.js";

interface ErrorMessagesStructure {
  notFound: CustomError;
  notCreated: CustomError;
  wrongCredentials: CustomError;
}

export default ErrorMessagesStructure;
