import request from "../request";
import { LoginCredentials, User, RegisterCredentials } from "../types/User";

export const authenticateUserService = (data: LoginCredentials) => {
  console.log("authing in service");
  return request({
    url: "authenticate",
    method: "POST",
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