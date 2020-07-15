import { AppActions } from "../types";
import { Cut } from "../types/Cut";
import { Dispatch } from "redux";
import { getAllCutsService } from "../services/CutService";
import { AppState } from "..";
import { User } from "../types/User";
import { boundLogoutUser, deleteUser } from "./UserActions";
import { recieveError, deleteError } from "./ErrorAction";
import { FBUser } from "../types/FBUser";
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

// export { boundGetAllCuts };
