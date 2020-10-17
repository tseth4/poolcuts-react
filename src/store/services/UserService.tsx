import request from "../request";
import { LoginCredentials, User, SignUpCredentials, PasswordRequest } from "../types/User";
import { FBUser } from "../types/FBUser";

export const authenticateUserService = (data: LoginCredentials) => {
  return request({
    url: "authenticate",
    method: "POST",
    data,
  });
};

export const authenticateFBUserService = (data: FBUser) => {
  let headers: any;
  headers = {
    Authorization: `Token ` + `${data.accessToken}`,
  };
  return request({
    url: "authenticate/facebook/user",
    method: "POST",
    headers,
    data,
  });
};

export const registerUserService = (data: SignUpCredentials) => {
  return request({
    url: "register/user",
    method: "POST",
    data,
  });
};

export const registerAdminService = (data: SignUpCredentials) => {
  return request({
    url: "register/admin",
    method: "POST",
    data,
  });
};

export const getUserService = (email: string) => {
  return request({
    url: `user/${email}`,
    method: "GET",
  });
};

export const activateUserService = (token: string) => {
  console.log("activating");
  return request({
    url: `/activation/user?token=${token}`,
    method: "GET",
  });
};


export const sendPasswordResetRequestService = (email: string) => {
  return request({
    url: `/reset?email=${email}`,
    method: "GET"
  })
}

export const sendNewPasswordService = (data: PasswordRequest) => {
  return request({
    url: '/reset/password',
    method: "POST",
    data
  })
}