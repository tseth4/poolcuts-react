import { CutActionTypes } from './Cut';
import { UserActionTypes } from './User';
import { ErrorActionTypes } from './Error';

export type AppActions = CutActionTypes | UserActionTypes | ErrorActionTypes;
