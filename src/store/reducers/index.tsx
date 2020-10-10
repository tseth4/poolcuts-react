import { combineReducers } from "redux";
import {
  cutReducer,
  cutErrorReducer,
  addCutSuccessReducer,
  updateCutSuccessReducer,
  openBarberCutsReducer,
} from "./CutReducer";
import { userReducer, signUpUserResponseReducer, signUpErrorReducer, authErrorReducer } from "./UserReducer";
import { fbUserReducer } from "./FBUsesrReducer";
import {
  bookReducer,
  appointmentReducer,
  bookSuccessReducer,
  bookErrorReducer,
  cancelBookReducer,
} from "./BookReducer";

const rootReducer = combineReducers({
  cut: cutReducer,
  user: userReducer,
  fbUser: fbUserReducer,
  authError: authErrorReducer,
  book: bookReducer,
  appt: appointmentReducer,
  bookSuccess: bookSuccessReducer,
  bookError: bookErrorReducer,
  cutError: cutErrorReducer,
  addCutSuccess: addCutSuccessReducer,
  cancelBookResp: cancelBookReducer,
  updateCutSuccess: updateCutSuccessReducer,
  openBarberCuts: openBarberCutsReducer,
  signUpUserResponse: signUpUserResponseReducer,
  signUpError: signUpErrorReducer
});

export default rootReducer;
