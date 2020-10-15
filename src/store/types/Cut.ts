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
  fbBarberId?: number;
  appointmentDate?: string;
  location?: string;
}

export interface UpdateCut {
  cutId?: number;
  appointmentDate?: string;
  location?: string;
}

// describing action names available
export const ADD_CUT = "ADD_CUT";
export const DELETE_CUT = "DELETE_CUT";
export const UPDATE_CUT = "UPDATE_CUT";

export const SET_BARBER_CUTS = "SET_BARBER_CUTS";
export const DELETE_BARBER_CUTS = "DELETE_BARBER_CUTS";

export const SET_CUTS = "SET_CUTS";

export const SET_CUT_ERROR = "SET_CUT_ERROR";
export const DELETE_CUT_ERROR = "DELETE_CUT_ERROR";

export const ADD_CUT_SUCCESS = "ADD_CUT_SUCCESS";
export const DELETE_CUT_SUCCESS = "DELETE_CUT_SUCCESS";

export const SAVE_CUT_TO_EDIT = "SAVE_CUT_TO_EDIT";
export const DELETE_CUT_TO_EDIT = "DELETE_CUT_TO_EDIT";

export const ADD_UPDATE_CUT_SUCCESS = "ADD_UPDATE_CUT_SUCCESS";
export const DELETE_UPDATE_CUT_SUCCESS = "DELETE_UPDATE_CUT_SUCCESS"
// describing the shape of cut slice state

export interface SetBarberCutsAction {
  type: typeof SET_BARBER_CUTS;
  cuts: Cut[]
}

export interface DeleteBarberCutsAction {
  type: typeof DELETE_BARBER_CUTS;
}

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

export interface AddUpdateCutSuccessAction {
  type: typeof ADD_UPDATE_CUT_SUCCESS;
  id: number
}

export interface DeleteUpdateCutSuccessAction {
  type: typeof DELETE_UPDATE_CUT_SUCCESS
}

export interface AddCutSuccessAction {
  type: typeof ADD_CUT_SUCCESS;
  cut: Cut[]
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

export interface SaveCutToEditAction {
  type: typeof SAVE_CUT_TO_EDIT;
  cut: Cut
}

export interface DeleteCutToEditAction {
  type: typeof DELETE_CUT_TO_EDIT;
}

export type CutActionTypes = SetBarberCutsAction | SaveCutToEditAction | DeleteCutToEditAction | DeleteUpdateCutSuccessAction | AddUpdateCutSuccessAction | SetCutsAction | AddCutAction | DeleteCutAction | UpdateCutAction | SetCutErrorAction | DeleteCutErrorAction | AddCutSuccessAction | DeleteCutSuccessAction | DeleteBarberCutsAction;
