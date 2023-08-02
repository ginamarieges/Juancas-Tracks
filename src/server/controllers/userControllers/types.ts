import { type Request } from "express";

export interface UserData {
  name: string;
  lastname: string;
  username: string;
  password: string;
}

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserData
>;
