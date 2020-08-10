import { combineReducers } from "redux";
import { cutReducer, cutErrorReducer, cutSuccessReducer } from "./CutReducer";
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
  cutSuccess: cutSuccessReducer,
  cancelBookResp: cancelBookReducer
});

export default rootReducer;
