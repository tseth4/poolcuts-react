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
