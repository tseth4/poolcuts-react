import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers/index';
import { LoadFromLocalStorageFn, SaveToLocalStorageFn } from "../utils/Functions";
import { AppActions } from './types';

export type AppState = ReturnType<typeof rootReducer>;

const PersistedState = LoadFromLocalStorageFn();

const store = createStore(rootReducer, 
  PersistedState, 
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));

store.subscribe(() => SaveToLocalStorageFn(store.getState()));

export default store;