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
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  userName: string,
  password: string,
  active: boolean,
  firstName: string,
  lastName: string,
  email: string
}

export const SAVE_USER = "SAVE_USER";
export const DELETE_USER = "DELETE_USER";

export interface SaveUserAction {
  type: typeof SAVE_USER;
  user: User
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
}

export type UserActionTypes = SaveUserAction | DeleteUserAction;