import { FBUser } from "../types/FBUser";
import { AppActions } from "../types";
import { AppState } from "..";
import { Dispatch } from "redux";
import { getUserService, registerUserService } from "../services/UserService";
import { recieveUser } from "./UserActions";
export const recieveFBUser = (fbUser: FBUser): AppActions => {
  return {
    type: "SAVE_FBUSER",
    fbUser: fbUser,
  };
};

export const deleteFBUser = (): AppActions => {
  return {
    type: "DELETE_FBUSER",
  };
};

export const boundLoginFBUser = (data: any) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  console.log("bound login facebook called")
  if (data.email !== undefined) {
    console.log("action checking if data.email is undefined")
    getUserService(data.email).then((res) => {
      if (res.id === 0) {
        console.log("registering in action")
        registerUserService({
          userName: data.firstName,
          password: Math.random().toString(36).slice(-8),
          active: true,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        }).catch(e => console.log(e));
      }
    }).catch(e => console.log(e));
  }
  dispatch(recieveFBUser(data));
};

export const boundLogoutFBUser = () => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch(deleteFBUser());
};
