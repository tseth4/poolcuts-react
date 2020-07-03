import { Cut } from "../types/Cut";
import { CutActionTypes } from '../types/Cut';

const cutReducerDefaultState: Cut[] = [];

const cutReducer = (state = cutReducerDefaultState, action: CutActionTypes ): Cut[] => {
  switch (action.type) {
    case "SET_CUTS":
      return action.cuts;
    default:
      return state;
  }
}

export { cutReducer };
