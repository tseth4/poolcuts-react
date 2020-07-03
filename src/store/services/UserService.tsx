import request from "../request";
import { LoginCredentials, User, RegisterCredentials } from "../types/User";

export const authenticateUserService = (data: LoginCredentials) => {
  return request({
    url: "authenticate",
    method: "POST",
    data
  })
}

export const registerUserService = (data: RegisterCredentials) => {
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