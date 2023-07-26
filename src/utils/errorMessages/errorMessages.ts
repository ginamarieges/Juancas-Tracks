import CustomError from "../../CustomError/CustomError";
import type ErrorMessagesStructure from "./types";

const errorMessages: ErrorMessagesStructure = {
  notFound: new CustomError("Endpoint not found", 404),
};

export default errorMessages;
