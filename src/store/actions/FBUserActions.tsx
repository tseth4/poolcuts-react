import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { AppActions } from "../types";
import { AppState } from "..";
import { Dispatch } from "redux";
import { getUserService, registerUserService, authenticateFBUserService } from "../services/UserService";
import { recieveUser } from "./UserActions";
import { recieveAuthError, deleteAuthError } from "./UserActions";
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
  if (data.email !== undefined) {
    authenticateFBUserService(data).then((res) => {
      dispatch(recieveFBUser(res));
      dispatch(deleteAuthError());
    }).catch((e) => {
      dispatch(recieveAuthError(e.data));
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
