import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import { useDispatch } from "react-redux";
import rootReducer from "./slices";


// Store redux into local storage
export const SaveToLocalStorageFn = (state: any) => {
  try {
    const serilizedState = JSON.stringify(state);
    sessionStorage.setItem("state_zendesign", serilizedState);
  } catch (error) {
    console.log(error);
  }
};

// Retrive state from local storage to redux store
export const LoadFromLocalStorageFn = () => {
  try {
    const serilizedState = sessionStorage.getItem("state_zendesign");
    if (serilizedState === null) return undefined;
    return JSON.parse(serilizedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export type AppState = ReturnType<typeof rootReducer>;

const PersistedState = LoadFromLocalStorageFn();

// creating store
// persisting state
// applying middleware
const store = createStore(
  rootReducer,
  PersistedState,
  applyMiddleware(thunk as ThunkMiddleware<AppState>, logger)
);

store.subscribe(() => SaveToLocalStorageFn(store.getState()));

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); 
// Export a hook that can be reused to resolve types
// returns a typed useDispatch() hook.

export default store;
