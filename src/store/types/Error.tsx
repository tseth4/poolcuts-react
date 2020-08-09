export interface IError {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
}

export const SAVE_ERROR = "SAVE_ERROR";
export const DELETE_ERROR = "DELETE_ERROR";

export interface SaveErrorAction {
  type: typeof SAVE_ERROR;
  error: IError
}

export interface DeleteErrorAction {
  type: typeof DELETE_ERROR;
}

export type ErrorActionTypes = SaveErrorAction | DeleteErrorAction;