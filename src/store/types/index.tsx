import { CutActionTypes } from './Cut';
import { UserActionTypes } from './User';
// import { ErrorActionTypes } from './Error';
import { FBUserActionTypes } from './FBUser';
import { BookActionTypes } from './Book';

export type AppActions = CutActionTypes | UserActionTypes | FBUserActionTypes | BookActionTypes;
