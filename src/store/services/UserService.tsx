import request from "../request";
import { LoginCredentials, User, RegisterCredentials } from "../types/User";
import { FBUser } from "../types/FBUser";

export const authenticateUserService = (data: LoginCredentials) => {
  console.log("authing in service");
  return request({
    url: "authenticate",
    method: "POST",
    data
  })
}


export const authenticateFBUserService = (data: FBUser) => {
  console.log("authing fb in service");
  let headers: any;
  headers = {
    Authorization: `Token ` + `${data.accessToken}`,
  };
  return request({
    url: "authenticate/facebook/user",
    method: "POST",
    headers,
    data
  })
}

export const registerUserService = (data: RegisterCredentials) => {
  console.log("registering")
  return request({
    url: "register",
    method: "POST",
    data
  })
}

export const registerAdminService = (data: RegisterCredentials) => {
  return request({
    url: "register/admin",
    method: "POST",
    data
  })
}

export const getUserService = (email: string) => {
  return request({
    url: `user/${email}`,
    method: "GET"
  })
}