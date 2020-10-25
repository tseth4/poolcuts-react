import { CutActionTypes } from "./Cut";
import { UserActionTypes } from "./User";
// import { ErrorActionTypes } from './Error';
import { FBUserActionTypes } from "./FBUser";
import { BookActionTypes } from "./Book";
import { UserIdInfoActionTypes } from "./UserIdInfo";
import { UserPasswordResetActionTypes } from "./UserPasswordReset";
import { UserSignUpActionTypes } from "./UserSignUp";

export type AppActions =
  | CutActionTypes
  | UserActionTypes
  | FBUserActionTypes
  | BookActionTypes
  | UserIdInfoActionTypes
  | UserPasswordResetActionTypes
  | UserSignUpActionTypes;
