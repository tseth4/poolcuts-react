import { AppActions } from "../types";
import { Cut } from "../types/Cut";
import { Dispatch } from "redux";
import { getAllCutsService, getOpenFacebookBarberCuts, getOpenBarberCuts } from "../services/CutService";
import { AppState } from "..";
import { User } from "../types/User";
import { boundLogoutUser, deleteUser } from "./UserActions";
import { recieveError, deleteError } from "./AuthErrorActions";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { deleteFBUser } from "./FBUserActions";
import { IError } from "../types/Error";

export const recieveAllCuts = (cuts: Cut[]): AppActions => {
  return {
    type: "SET_CUTS",
    cuts
  };
};

export const recieveCutError = (error: IError): AppActions => {
  console.log(error);
  return {
    type: "SET_CUT_ERROR",
    cutError: error
  };
}

export const deleteCutError = (): AppActions => {
  return{
    type: "DELETE_CUT_ERROR",
  }
}

export const boundGetAllCuts = (user: User | FBUser) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getAllCutsService(user).then((res) => {
    dispatch(recieveAllCuts(res));
    dispatch(deleteCutError());
  }).catch(e => {
    dispatch(recieveCutError(e));
    dispatch(deleteUser());
    dispatch(deleteFBUser());
  });
};

export const boundGetOpenFacebookBarberCuts = (barber: FBUserAuthResponse) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getOpenFacebookBarberCuts(barber).then((res)=> {
    dispatch(recieveAllCuts(res));
    dispatch(deleteCutError());
  }).catch(e => {
    dispatch(recieveCutError(e));
  })
}

export const boundGetOpenBarberCuts = (barber: User) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getOpenBarberCuts(barber).then((res) => {
    dispatch(recieveAllCuts(res));
    dispatch(deleteCutError());
  }).catch(e => {
    dispatch(recieveCutError(e));
  })
}

// export { boundGetAllCuts };
