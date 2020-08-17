import { User, Barber, fbBarber } from "./User";
import { FBUserAuthResponse } from "./FBUser";
import { IError } from "./Error";

export interface Cut {
  cutId?: number;
  barberId?: Barber ;
  appointmentDate?: string;
  location?: string;
  fbBarberId?: fbBarber;
}

export interface NewCut {
  barberId?: number;
  appointmentDate?: string;
  location?: string;
}

// describing action names available
export const ADD_CUT = "ADD_CUT";
export const DELETE_CUT = "DELETE_CUT";
export const UPDATE_CUT = "UPDATE_CUT";
export const SET_CUTS = "SET_CUTS";
export const SET_CUT_ERROR = "SET_CUT_ERROR";
export const DELETE_CUT_ERROR = "DELETE_CUT_ERROR";
export const ADD_CUT_SUCCESS = "ADD_CUT_SUCCESS";
export const DELETE_CUT_SUCCESS = "DELETE_CUT_SUCCESS";

// describing the shape of cut slice state
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

export interface AddCutSuccessAction {
  type: typeof ADD_CUT_SUCCESS;
  cut: Cut
}

export interface DeleteCutSuccessAction {
  type: typeof DELETE_CUT_SUCCESS;
}

export interface SetCutErrorAction {
  type: typeof SET_CUT_ERROR;
  cutError: IError;
}

export interface DeleteCutErrorAction {
  type: typeof DELETE_CUT_ERROR;
}

export type CutActionTypes = SetCutsAction | AddCutAction | DeleteCutAction | UpdateCutAction | SetCutErrorAction | DeleteCutErrorAction | AddCutSuccessAction;
