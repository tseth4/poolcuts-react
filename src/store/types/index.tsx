import { Cut } from './Cut';
// describing the shape of cut slice state


// describing action names available
export const ADD_CUT = "ADD_CUT";
export const DELETE_CUT = "DELETE_CUT";
export const UPDATE_CUT = "UPDATE_CUT";
export const SET_CUTS = "SET_CUTS";

export interface AddCutAction {
  type: typeof ADD_CUT;
  cut: Cut
}

export interface DeleteCutAction {
  type: typeof DELETE_CUT;
  id: string;
}

export interface UpdateCutAction {
  type: typeof UPDATE_CUT;
  cut: Cut;
}


export interface SetCutsAction {
  type: typeof SET_CUTS;
  cuts: Cut[];
}


export type CutActionTypes = SetCutsAction | AddCutAction | DeleteCutAction | UpdateCutAction;

export type AppActions = CutActionTypes;
