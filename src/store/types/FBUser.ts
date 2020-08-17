// For logging In
export interface FBUser {
  id: number,
  accessToken: string,
  email: string,
  firstName: string,
  lastName: string
}

// For storing
export interface FBUserAuthResponse {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  roles: string,
  type: string,
  accessToken: string
}

export const SAVE_FBUSER = "SAVE_FBUSER";
export const DELETE_FBUSER = "DELETE_FBUSER";

export interface SaveFBUserAction {
  type: typeof SAVE_FBUSER;
  fbUser: FBUser
}

export interface DeleteFBUserAction {
  type: typeof DELETE_FBUSER;
}

export type FBUserActionTypes = SaveFBUserAction | DeleteFBUserAction;