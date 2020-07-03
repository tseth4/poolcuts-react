import { AppActions } from "../types";
import { User, LoginCredentials, RegisterCredentials } from "../types/User";
import { Dispatch } from "redux";
import { authenticateUserService, registerUserService, registerAdminService } from "../services/UserService";
import { AppState } from "..";

export const recieveUser = (user: User): AppActions => {
  return{
    type: "SAVE_USER",
    user
  }
}

export const boundLoginUser = (data: LoginCredentials) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  authenticateUserService(data).then((res) => {
    dispatch(recieveUser(res));
  })
}

export const boundRegisterUser = (data: RegisterCredentials) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  registerUserService(data);
}

export const boundRegisterAdmin = (data: RegisterCredentials) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  registerAdminService(data);
}
