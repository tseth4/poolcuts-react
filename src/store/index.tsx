import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';

import { LoadFromLocalStorageFn, SaveToLocalStorageFn } from "../utils/Functions";

const PersistedState = LoadFromLocalStorageFn();

const store = createStore(rootReducer, PersistedState, applyMiddleware(ReduxThunk));

store.subscribe(() => SaveToLocalStorageFn(store.getState()));

export default store;