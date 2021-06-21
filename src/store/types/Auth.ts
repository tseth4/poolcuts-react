import { IError } from "./Error";

export interface AuthState {
  currentUser?: User
  isAuthenticated: boolean
  error: IError
  loading: boolean
}

export interface User {
  id: number;
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


