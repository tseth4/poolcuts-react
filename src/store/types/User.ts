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

export interface SignUpCredentials {
  userName: string,
  password: string,
  active: boolean,
  firstName: string,
  lastName: string,
  email: string
}

export interface SignUpResponse {
  id?: number,
  userName?: string,
  password?: string,
  active?: boolean,
  roles?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  enabled?: boolean,
  cuts?: any
}

export interface ActivationResponse {
  activationSuccess?: boolean,
  email?: string,
  message?: string
}

export const SAVE_USER = "SAVE_USER";
export const DELETE_USER = "DELETE_USER";
export const SAVE_SIGNUPUSERRESPONSE = "SAVE_SIGNUPUSERRESPONSE"
export const DELETE_SIGNUPUSERRESPONSE = "DELETE_SIGNUPUSERRESPONSE"
export const SAVE_ACTIVATEUSERRESPONSE = "SAVE_ACTIVATEUSERRESPONSE"
export const DELETE_ACTIVATEUSERRESPONSE = "DELETE_ACTIVATEUSERRESPONSE"
export const SAVE_ACTIVATE_ERROR = "SAVE_ACTIVATE_ERROR"
export const DELETE_ACTIVATE_ERROR = "DELETE_ACTIVATE_ERROR"
export const SAVE_SIGNUP_ERROR = "SAVE_SIGNUP_ERROR"
export const DELETE_SIGNUP_ERROR = "DELETE_SIGNUP_ERROR"
export const SAVE_AUTH_ERROR = "SAVE_AUTH_ERROR";
export const DELETE_AUTH_ERROR = "DELETE_AUTH_ERROR";


export interface SaveUserAction {
  type: typeof SAVE_USER;
  user: User
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
}

export interface SaveSignUpUserResponse {
  type: typeof SAVE_SIGNUPUSERRESPONSE;
  signUpUserResponse: SignUpResponse
}

export interface DeleteSignUpUserResponse {
  type: typeof DELETE_SIGNUPUSERRESPONSE;
}

export interface SaveActivateUserResponse {
  type: typeof SAVE_ACTIVATEUSERRESPONSE;
  activateUserResponse: ActivationResponse
}
export interface DeleteActivateUserResponse {
  type: typeof DELETE_ACTIVATEUSERRESPONSE;
}

export interface SaveActivateError {
  type: typeof SAVE_ACTIVATE_ERROR
  activateError: IError
}

export interface DeleteActivateError {
  type: typeof DELETE_ACTIVATE_ERROR
}

export interface SaveSignUpError {
  type: typeof SAVE_SIGNUP_ERROR;
  signUpError: IError
}
export interface DeleteSignUpError {
  type: typeof DELETE_SIGNUP_ERROR;
}


export interface SaveAuthErrorAction {
  type: typeof SAVE_AUTH_ERROR;
  authError: IError
}

export interface DeleteAuthErrorAction {
  type: typeof DELETE_AUTH_ERROR;
}




export type UserActionTypes = SaveUserAction | DeleteUserAction | SaveSignUpUserResponse | DeleteSignUpUserResponse | SaveSignUpError | DeleteSignUpError  | SaveAuthErrorAction | DeleteAuthErrorAction | SaveActivateUserResponse | DeleteActivateUserResponse | SaveActivateError | DeleteActivateError;