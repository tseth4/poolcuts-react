import { Cut } from "../types/Cut";
import { CutActionTypes } from "../types/Cut";
import { IError } from "../types/Error";

const cutReducerDefaultState: Cut[] = [];

const cutReducer = (
  state = cutReducerDefaultState,
  action: CutActionTypes
): Cut[] => {
  switch (action.type) {
    case "SET_CUTS":
      return action.cuts;
    default:
      return state;
  }
};

const cutSuccessReducerDefaultState: Cut = {};
const addCutSuccessReducer = (
  state = cutSuccessReducerDefaultState,
  action: CutActionTypes
): Cut | any => {
  switch (action.type) {
    case "ADD_CUT_SUCCESS":
      return action.cut;
    case "DELETE_CUT_SUCCESS":
      return {};
    default:
      return state;
  }
};

const cutErrorReducerDefaultState: IError = {};
const cutErrorReducer = (
  state = cutErrorReducerDefaultState,
  action: CutActionTypes
): IError => {
  switch (action.type) {
    case "SET_CUT_ERROR":
      return action.cutError;
    case "DELETE_CUT_ERROR":
      return {};
    default:
      return state;
  }
};

const updateCutSuccessReducerDefaultState: number = 0;
const updateCutSuccessReducer = (
  state = updateCutSuccessReducerDefaultState,
  action: CutActionTypes
): number | any => {
  switch (action.type) {
    case "ADD_UPDATE_CUT_SUCCESS":
      return action.id;
    case "DELETE_UPDATE_CUT_SUCCESS":
      return 0;
    default:
      return state;
  }
};

export { cutReducer, cutErrorReducer, addCutSuccessReducer, updateCutSuccessReducer };
