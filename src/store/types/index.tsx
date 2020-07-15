import { CutActionTypes } from './Cut';
import { UserActionTypes } from './User';
import { ErrorActionTypes } from './Error';
import { FBUserActionTypes } from './FBUser';

export type AppActions = CutActionTypes | UserActionTypes | ErrorActionTypes | FBUserActionTypes;
