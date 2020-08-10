import { Cut } from "../types/Cut";
import { CutActionTypes } from '../types/Cut';
import { IError } from "../types/Error";

const cutReducerDefaultState: Cut[] = [];

const cutReducer = (state = cutReducerDefaultState, action: CutActionTypes ): Cut[] => {
  switch (action.type) {
    case "SET_CUTS":
      return action.cuts;
    default:
      return state;
  }
}

const cutSuccessReducerDefaultState: Cut = {};
const cutSuccessReducer = (state = cutSuccessReducerDefaultState, action: CutActionTypes): Cut => {
  switch (action.type) {
    case "ADD_CUT_SUCCESS":
      return action.cut;
    default:
      return state;
  }
}

const cutErrorReducerDefaultState: IError = {};
const cutErrorReducer = (state = cutErrorReducerDefaultState, action: CutActionTypes): IError => {
  switch (action.type) {
    case "SET_CUT_ERROR":
      return action.cutError;
    case "DELETE_CUT_ERROR":
      return state;
    default:
      return state;
  }
}


export { cutReducer, cutErrorReducer, cutSuccessReducer };
