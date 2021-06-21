import request from "../request";
import { LoginCredentials, User} from "../types/Auth";
import { FBUser } from "../types/FBUser";
import { UserIdInfoWithTokenRequest } from "../types/UserIdInfo";
import { SignUpCredentials } from "../types/UserSignUp";
import { PasswordRequest } from "../types/UserPasswordReset";

export const authenticateUserService = (data: LoginCredentials) => {
  console.log(data);
  return request({
    url: "authenticate",
    method: "POST",
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

export const sendUserIdInfoRequestService = (email: string) => {
  return request({
    url: `/info/userid/email?email=${email}`,
    method: "GET"
  })
}

export const getUserIdInfoWithTokenService = (data: UserIdInfoWithTokenRequest) => {
  return request({
    url: "/info/userid",
    method: "POST",
    data
  })
}