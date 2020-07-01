import { combineReducers } from "redux";
import { cutReducer } from "./CutReducer";

const rootReducer = combineReducers({
  cut: cutReducer,
});

export default rootReducer;
