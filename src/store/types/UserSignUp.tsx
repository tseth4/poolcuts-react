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

