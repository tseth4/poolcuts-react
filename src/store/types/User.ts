import { IError } from "./Error";

export interface User {
  id: number;
  jwt: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
}

export interface Barber {
  id: number,
  username: string,
  roles: string,
  firstName: string,
  lastName: string,
  email: string
}

export interface Client {
  id: number,
  username: string,
  roles: string,
  firstName: string,
  lastName: string,
  email: string 
}

export interface fbBarber {
  id: number,
  roles: string,
  firstName: string,
  lastName: string,
  email: string,
  cut: any
}

export interface fbClient {
  id: number,
  roles: string,
  firstName: string,
  lastName: string,
  email: string,
  cut: any 
}
export interface LoginCredentials {
  username: string;
  password: string;
}



export const SAVE_USER = "SAVE_USER";
export const DELETE_USER = "DELETE_USER";


export const SAVE_AUTH_ERROR = "SAVE_AUTH_ERROR";
export const DELETE_AUTH_ERROR = "DELETE_AUTH_ERROR";


export interface SaveUserAction {
  type: typeof SAVE_USER;
  user: User
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
}



export interface SaveAuthErrorAction {
  type: typeof SAVE_AUTH_ERROR;
  authError: IError
}

export interface DeleteAuthErrorAction {
  type: typeof DELETE_AUTH_ERROR;
}

export type UserActionTypes = SaveUserAction | DeleteUserAction | SaveAuthErrorAction | DeleteAuthErrorAction 