import { IError } from "./Error";

export interface SignUpCredentials {
  userName: string;
  password: string;
  active: boolean;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SignUpResponse {
  id?: number;
  userName?: string;
  password?: string;
  active?: boolean;
  roles?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  enabled?: boolean;
  cuts?: any;
}

export interface ActivationResponse {
  activationSuccess?: boolean;
  email?: string;
  message?: string;
}

export const SAVE_SIGNUPUSERRESPONSE = "SAVE_SIGNUPUSERRESPONSE";
export const DELETE_SIGNUPUSERRESPONSE = "DELETE_SIGNUPUSERRESPONSE";
export const SAVE_ACTIVATEUSERRESPONSE = "SAVE_ACTIVATEUSERRESPONSE";
export const DELETE_ACTIVATEUSERRESPONSE = "DELETE_ACTIVATEUSERRESPONSE";
export const SAVE_ACTIVATE_ERROR = "SAVE_ACTIVATE_ERROR";
export const DELETE_ACTIVATE_ERROR = "DELETE_ACTIVATE_ERROR";
export const SAVE_SIGNUP_ERROR = "SAVE_SIGNUP_ERROR";
export const DELETE_SIGNUP_ERROR = "DELETE_SIGNUP_ERROR";

export interface SaveSignUpUserResponse {
  type: typeof SAVE_SIGNUPUSERRESPONSE;
  signUpUserResponse: SignUpResponse;
}

export interface DeleteSignUpUserResponse {
  type: typeof DELETE_SIGNUPUSERRESPONSE;
}

export interface SaveActivateUserResponse {
  type: typeof SAVE_ACTIVATEUSERRESPONSE;
  activateUserResponse: ActivationResponse;
}
export interface DeleteActivateUserResponse {
  type: typeof DELETE_ACTIVATEUSERRESPONSE;
}

export interface SaveActivateError {
  type: typeof SAVE_ACTIVATE_ERROR;
  activateError: IError;
}

export interface DeleteActivateError {
  type: typeof DELETE_ACTIVATE_ERROR;
}

export interface SaveSignUpError {
  type: typeof SAVE_SIGNUP_ERROR;
  signUpError: IError;
}
export interface DeleteSignUpError {
  type: typeof DELETE_SIGNUP_ERROR;
}

export type UserSignUpActionTypes =
  | SaveSignUpUserResponse
  | DeleteSignUpUserResponse
  | SaveSignUpError
  | DeleteSignUpError
  | SaveActivateUserResponse
  | DeleteActivateUserResponse
  | SaveActivateError
  | DeleteActivateError;
