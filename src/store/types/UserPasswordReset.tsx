import { IError } from "./Error";
// type to submit
export interface PasswordRequest {
  password?: string;
  token?: string;
}

// after submit PasswordRequest response
export interface PasswordRequestResponse {
  emailSent?: boolean;
  email?: string;
  message?: string;
}

// after submit new password
export interface PasswordResetResponse {
  passwordResetSuccess?: boolean;
  email?: string;
  message?: string;
}

export const SAVE_PASSWORDRESET_RESPONSE = "SAVE_PASSWORDRESET_RESPONSE";
export const DELETE_PASSWORDRESET_RESPONSE = "DELETE_PASSWORDRESET_RESPONSE";
export const SAVE_PASSWORDRESET_ERROR = "SAVE_PASSWORDRESET_ERROR";
export const DELETE_PASSWORDRESET_ERROR = "DELETE_PASSWORDRESET_ERROR";

export const SAVE_PASSWORDREQUEST_RESPONSE = "SAVE_PASSWORDREQUEST_RESPONSE";
export const DELETE_PASSWORDREQUEST_RESPONSE = "DELETE_PASSWORDREQUEST_RESPONSE";
export const SAVE_PASSWORDREQUEST_ERROR = "SAVE_PASSWORDREQUEST_ERROR";
export const DELETE_PASSWORDREQUEST_ERROR = "DELETE_PASSWORDREQUEST_ERROR";

export interface SavePasswordResetResponse {
  type: typeof SAVE_PASSWORDRESET_RESPONSE;
  passwordResetResponse: PasswordResetResponse;
}

export interface DeletePasswordResetResponse {
  type: typeof DELETE_PASSWORDRESET_RESPONSE;
}

export interface SavePasswordResetError {
  type: typeof SAVE_PASSWORDRESET_ERROR;
  passwordResetError: IError;
}

export interface DeletePasswordResetError {
  type: typeof DELETE_PASSWORDRESET_ERROR;
}

export interface SavePasswordRequestResponse {
  type: typeof SAVE_PASSWORDREQUEST_RESPONSE;
  passwordRequestResponse: PasswordRequestResponse;
}

export interface DeletePasswordRequestResponse {
  type: typeof DELETE_PASSWORDREQUEST_RESPONSE;
}

export interface SavePasswordRequestError {
  type: typeof SAVE_PASSWORDREQUEST_ERROR;
  passwordRequestError: IError;
}

export interface DeletePasswordRequestError {
  type: typeof DELETE_PASSWORDREQUEST_ERROR;
}

export type UserPasswordResetActionTypes =
  | SavePasswordResetResponse
  | DeletePasswordResetResponse
  | SavePasswordRequestResponse
  | DeletePasswordRequestResponse
  | SavePasswordRequestError
  | DeletePasswordRequestError
  | SavePasswordResetError
  | DeletePasswordResetError;
