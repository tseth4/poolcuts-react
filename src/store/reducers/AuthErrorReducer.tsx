import { IError, ErrorActionTypes } from "../types/Error";

const errorReducerDefaultState: IError[] = [];

const errorReducer = (
  state = errorReducerDefaultState,
  action: ErrorActionTypes
): Error[] | any => {
  switch (action.type) {
    case "SAVE_ERROR":
      console.log(action.error);
      return [action.error];
    case "DELETE_ERROR":
      return [];
    default:
      return state;
  }
};

export { errorReducer };
