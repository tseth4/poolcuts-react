// fetch the user id info with the token. send email with token, use token to info
import { IError } from "./Error";

// response on successfull request
export interface UserIdInfoRequestResponse {
  emailSent?: boolean;
  email?: string;
  message?: string;
}

// type to send as body to get the info with valid token
export interface UserIdInfoWithTokenRequest {
  email?: string;
  token?: string;
}

// response to get info on success
export interface UserIdInfoWithTokenRequestResponse {
  usernameInfoSuccess?: boolean;
  username?: string;
  message?: string;
}

export const SAVE_USERIDINFOREQUEST_RESPONSE = "SAVE_USERIDINFOREQUEST_RESPONSE";
export const DELETE_USERIDINFOREQUEST_RESPONSE = "DELETE_USERIDINFOREQUEST_RESPONSE";
export const SAVE_USERIDINFOREQUEST_ERROR = "SAVE_USERIDINFOREQUEST_ERROR";
export const DELETE_USERIDINFOREQUEST_ERROR = "DELETE_USERIDINFOREQUEST_ERROR";

export const SAVE_USERIDINFOWITHTOKENREQUEST_RESPONSE = "SAVE_USERIDINFOWITHTOKENREQUEST_RESPONSE";
export const DELETE_USERIDINFOWITHTOKENREQUEST_RESPONSE = "DELETE_USERIDINFOWITHTOKENREQUEST_RESPONSE";
export const SAVE_USERIDINFOWITHTOKENREQUEST_ERROR = "SAVE_USERIDINFOWITHTOKENREQUEST_ERROR";
export const DELETE_USERIDINFOWITHTOKENREQUEST_ERROR = "DELETE_USERIDINFOWITHTOKENREQUEST_ERROR";

export interface SaveUserIdInfoRequestResponse {
  type: typeof SAVE_USERIDINFOREQUEST_RESPONSE;
  userIdInfoRequestResponse: UserIdInfoRequestResponse;
}

export interface DeleteUserIdInfoRequestResponse {
  type: typeof DELETE_USERIDINFOREQUEST_RESPONSE;
}

export interface SaveUserIdInfoRequestError {
  type: typeof SAVE_USERIDINFOREQUEST_ERROR;
  userIdInfoRequestError: IError;
}

export interface DeleteUserIdInfoRequestError {
  type: typeof DELETE_USERIDINFOREQUEST_ERROR;
}

export interface SaveUserIdInfoWithTokenResponse {
  type: typeof SAVE_USERIDINFOWITHTOKENREQUEST_RESPONSE;
  userIdInfoWithTokenRequestResponse: UserIdInfoWithTokenRequestResponse;
}

export interface DeleteUserIdInfoWithTokenResponse {
  type: typeof DELETE_USERIDINFOWITHTOKENREQUEST_RESPONSE;
}

export interface SaveUserIdInfoWithTokenError {
  type: typeof SAVE_USERIDINFOWITHTOKENREQUEST_ERROR;
  userIdInfoWithTokenRequestError: IError;
}

export interface DeleteUserIdInfoWithTokenError {
  type: typeof DELETE_USERIDINFOWITHTOKENREQUEST_ERROR;
}

export type UserIdInfoActionTypes =
  | SaveUserIdInfoRequestResponse
  | DeleteUserIdInfoRequestResponse
  | SaveUserIdInfoRequestError
  | DeleteUserIdInfoRequestError
  | SaveUserIdInfoWithTokenResponse
  | DeleteUserIdInfoWithTokenResponse
  | SaveUserIdInfoWithTokenError
  | DeleteUserIdInfoWithTokenError;
