import { combineReducers } from "redux";
import {
  cutReducer,
  cutErrorReducer,
  addCutSuccessReducer,
  updateCutSuccessReducer,
  openBarberCutsReducer,
} from "./CutReducer";
import {
  userReducer,
  signUpUserResponseReducer,
  activateUserErrorReducer,
  signUpErrorReducer,
  authErrorReducer,
  activateUserResponseReducer,
  passwordRequestResponseReducer,
  passwordResetResponseReducer,
  passwordRequestErrorReducer,
  passwordResetErrorReducer
} from "./UserReducer";
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
  signUpError: signUpErrorReducer,
  activateUserResponse: activateUserResponseReducer,
  activateError: activateUserErrorReducer,
  passwordRequestResponse: passwordRequestResponseReducer,
  passwordRequestError: passwordRequestErrorReducer,
  passwordResetResponse: passwordResetResponseReducer,
  passwordResetError: passwordResetErrorReducer
});

export default rootReducer;
