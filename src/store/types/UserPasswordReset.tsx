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

