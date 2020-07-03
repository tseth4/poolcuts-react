import { combineReducers } from "redux";
import { cutReducer } from "./CutReducer";
import { userReducer } from "./UserReducer";

const rootReducer = combineReducers({
  cut: cutReducer,
  user: userReducer
});

export default rootReducer;
