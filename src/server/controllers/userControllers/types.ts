import { type Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserData extends UserCredentials {
  name: string;
  lastname: string;
}

export interface UserInformation extends UserData {
  _id: string;
}

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserData
>;

export type CustomRequestLogin = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
