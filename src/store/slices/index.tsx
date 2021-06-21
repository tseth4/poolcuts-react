import { combineReducers, Reducer } from "redux";
import { RootState } from "../types/index";
import bookReducer from "./bookSlice";
import cutReducer from "./cutSlice";
import authReducer from "./authSlice";


const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  bookState: bookReducer,
  cutState: cutReducer,
  authState: authReducer
});

export default rootReducer;