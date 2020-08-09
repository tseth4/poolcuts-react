import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { AppActions } from "../types";
import { AppState } from "..";
import { Dispatch } from "redux";
import { getUserService, registerUserService, authenticateFBUserService } from "../services/UserService";
import { recieveUser } from "./UserActions";
export const recieveFBUser = (fbUser: FBUserAuthResponse): AppActions => {
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

export const boundLoginFBUser = (data: FBUser) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  console.log("bound login facebook called")
  if (data.email !== undefined) {
    console.log("action checking if data.email is undefined")
    authenticateFBUserService(data).then().then((res) => {
      console.log(res);
      dispatch(recieveFBUser(res));
    }).catch((err) => {
      console.log(err);
    })
  }
};

export const boundGetFacebookClientAppointments = (fbUser: FBUserAuthResponse) => {

}

export const boundLogoutFBUser = () => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch(deleteFBUser());
};
