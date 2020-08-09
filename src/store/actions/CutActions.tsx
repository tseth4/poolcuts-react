import { AppActions } from "../types";
import { Cut } from "../types/Cut";
import { Dispatch } from "redux";
import { getAllCutsService, getOpenFacebookBarberCuts, getOpenBarberCuts } from "../services/CutService";
import { AppState } from "..";
import { User } from "../types/User";
import { boundLogoutUser, deleteUser } from "./UserActions";
import { recieveError, deleteError } from "./ErrorAction";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { deleteFBUser } from "./FBUserActions";

export const recieveAllCuts = (cuts: Cut[]): AppActions => {
  return {
    type: "SET_CUTS",
    cuts
  };
};

export const boundGetAllCuts = (user: User | FBUser) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getAllCutsService(user).then((res) => {
    dispatch(recieveAllCuts(res));
    dispatch(deleteError());
  }).catch(e => {
    dispatch(recieveError(e));
    dispatch(deleteUser());
    dispatch(deleteFBUser());
  });
};

export const boundGetOpenFacebookBarberCuts = (barber: FBUserAuthResponse) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getOpenFacebookBarberCuts(barber).then((res)=> {
    dispatch(recieveAllCuts(res));
  }).catch(e => {
    dispatch(recieveError(e));
  })
}

export const boundGetOpenBarberCuts = (barber: User) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getOpenBarberCuts(barber).then((res) => {
    dispatch(recieveAllCuts(res));
  }).catch(e => {
    dispatch(recieveError(e));
  })
}

// export { boundGetAllCuts };
