import { AppActions } from "../types";
import { Cut, NewCut } from "../types/Cut";
import { Dispatch } from "redux";
import { getAllCutsService, getOpenFacebookBarberCuts, getOpenBarberCuts, deleteCutsByIdsArr, newCutService } from "../services/CutService";
import { AppState } from "..";
import { User } from "../types/User";
import { boundLogoutUser, deleteUser } from "./UserActions";
import { recieveError, deleteError } from "./AuthErrorActions";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { deleteFBUser } from "./FBUserActions";
import { IError } from "../types/Error";
import { SelectedIds } from "../types/SelectedIds";
import { cancelBooksByIdsArr } from "../services/BookService";

export const recieveAllCuts = (cuts: Cut[]): AppActions => {
  return {
    type: "SET_CUTS",
    cuts
  };
};

export const recieveAddCutSuccess = (cut: Cut): AppActions => {
  return {
    type: "ADD_CUT_SUCCESS",
    cut
  }
}

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

export const boundCancelCutsByIdArr= (ids: SelectedIds, user: any) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  deleteCutsByIdsArr(ids, user).then(res => console.log(res)).catch(e => dispatch(recieveCutError(e)));
}

export const boundNewOpenCut = (newCut: NewCut, user: FBUserAuthResponse | User) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  newCutService(newCut, user).then(res => dispatch(recieveAddCutSuccess(res))).catch(e => dispatch(recieveCutError(e)));
}

// boundFbBarberNewCut
// http://localhost:8080/barber/facebook/3799831360043592/cut/new

// boundBarberNewCut
// http://localhost:8080/barber/74/cut/new


// export { boundGetAllCuts };
