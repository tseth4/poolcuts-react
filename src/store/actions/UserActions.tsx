import { AppActions } from "../types";
import { User, LoginCredentials, RegisterCredentials } from "../types/User";
import { Dispatch } from "redux";
import { authenticateUserService, registerUserService, registerAdminService } from "../services/UserService";
import { AppState } from "..";

export const recieveUser = (user: User): AppActions => {
  console.log(user);
  return{
    type: "SAVE_USER",
    user: user
  }
}

export const deleteUser = (): AppActions => {
  console.log("deleting");
  return{
    type: "DELETE_USER"
  }
}

export const boundLoginUser = (data: LoginCredentials) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  console.log("bounding");
  authenticateUserService(data).then((res) => {
    dispatch(recieveUser(res));
  }).catch((e) => console.log(e));
}

export const boundLogoutUser = () => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  console.log("boundLogOut")
  dispatch(deleteUser());
}

export const boundRegisterUser = (data: RegisterCredentials) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  registerUserService(data);
}

export const boundRegisterAdmin = (data: RegisterCredentials) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  registerAdminService(data);
}