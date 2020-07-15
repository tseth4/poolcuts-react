import { combineReducers } from "redux";
import { cutReducer } from "./CutReducer";
import { userReducer } from "./UserReducer";
import { fbUserReducer } from "./FBUsesrReducer";

const rootReducer = combineReducers({
  cut: cutReducer,
  user: userReducer,
  fbUser: fbUserReducer
});

export default rootReducer;
