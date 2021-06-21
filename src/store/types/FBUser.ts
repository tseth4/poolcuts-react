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

