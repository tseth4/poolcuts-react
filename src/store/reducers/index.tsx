import { combineReducers } from "redux";
import { cutReducer, cutErrorReducer, addCutSuccessReducer, updateCutSuccessReducer } from "./CutReducer";
import { userReducer } from "./UserReducer";
import { fbUserReducer } from "./FBUsesrReducer";
import { errorReducer } from "./AuthErrorReducer";
import { bookReducer, appointmentReducer, bookSuccessReducer, bookErrorReducer, cancelBookReducer } from "./BookReducer";

const rootReducer = combineReducers({
  cut: cutReducer,
  user: userReducer,
  fbUser: fbUserReducer,
  authError: errorReducer,
  book: bookReducer,
  appt: appointmentReducer,
  bookSuccess: bookSuccessReducer,
  bookError: bookErrorReducer,
  cutError: cutErrorReducer,
  addCutSuccess: addCutSuccessReducer,
  cancelBookResp: cancelBookReducer,
  updateCutSuccess: updateCutSuccessReducer
});

export default rootReducer;
