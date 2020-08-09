import { combineReducers } from "redux";
import { cutReducer } from "./CutReducer";
import { userReducer } from "./UserReducer";
import { fbUserReducer } from "./FBUsesrReducer";
import { errorReducer } from "./ErrorReducer";
import { bookReducer, appointmentReducer } from "./BookReducer";

const rootReducer = combineReducers({
  cut: cutReducer,
  user: userReducer,
  fbUser: fbUserReducer,
  error: errorReducer,
  book: bookReducer,
  appt: appointmentReducer
});

export default rootReducer;
