import { SET_CUTS, CutActionTypes, AppActions } from "../types";
import { Cut } from "../types/Cut";
import { Dispatch } from "redux";
import { getAllCutsService } from "../services/CutService";
import { AppState } from "..";

export const recieveAllCuts = (cuts: Cut[]): AppActions => {
  return {
    type: "SET_CUTS",
    cuts
  };
};

export const boundGetAllCuts = () => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getAllCutsService().then((res) => {
    dispatch(recieveAllCuts(res));
  });
};

// export { boundGetAllCuts };
