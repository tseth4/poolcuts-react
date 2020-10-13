import { AppActions } from "../types";
import {
  User,
  LoginCredentials,
  SignUpResponse,
  SignUpCredentials,
  ActivationResponse,
} from "../types/User";
import { Dispatch } from "redux";
import {
  authenticateUserService,
  registerUserService,
  registerAdminService,
  activateUserService,
} from "../services/UserService";
import { AppState } from "..";
import { IError } from "../types/Error";

export const recieveAuthError = (error: IError): AppActions => {
  return {
    type: "SAVE_AUTH_ERROR",
    authError: error,
  };
};

export const deleteAuthError = (): AppActions => {
  return {
    type: "DELETE_AUTH_ERROR",
  };
};

export const recieveSignUpError = (error: IError): AppActions => {
  return {
    type: "SAVE_SIGNUP_ERROR",
    signUpError: error,
  };
};

export const deleteSignUpError = (): AppActions => {
  return {
    type: "DELETE_SIGNUP_ERROR",
  };
};

export const recieveActivateError = (error: IError): AppActions => {
  return {
    type: "SAVE_ACTIVATE_ERROR",
    activateError: error,
  };
};

export const deleteActivateError = (): AppActions => {
  return {
    type: "DELETE_ACTIVATE_ERROR",
  };
};

export const recieveUser = (user: User): AppActions => {
  return {
    type: "SAVE_USER",
    user: user,
  };
};

export const deleteUser = (): AppActions => {
  return {
    type: "DELETE_USER",
  };
};

export const recieveSignUpUserResponseSuccess = (
  user: SignUpResponse
): AppActions => {
  return {
    type: "SAVE_SIGNUPUSERRESPONSE",
    signUpUserResponse: user,
  };
};

export const deleteSignUpUserResponseSuccess = (): AppActions => {
  return {
    type: "DELETE_SIGNUPUSERRESPONSE",
  };
};

export const recieveActivateUserResponseSuccess = (
  response: ActivationResponse
): AppActions => {
  return {
    type: "SAVE_ACTIVATEUSERRESPONSE",
    activateUserResponse: response,
  };
};
export const deleteActivateUserResponseSuccess = (): AppActions => {
  return {
    type: "DELETE_ACTIVATEUSERRESPONSE",
  };
};

export const boundLoginUser = (data: LoginCredentials) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  authenticateUserService(data)
    .then((res) => {
      dispatch(recieveUser(res));
      dispatch(deleteAuthError());
    })
    .catch((e) => {
      dispatch(recieveAuthError(e.data));
    });
};

export const boundLogoutUser = () => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch(deleteUser());
};

export const boundRegisterUser = (data: SignUpCredentials) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  registerUserService(data)
    .then((res) => {
      dispatch(recieveSignUpUserResponseSuccess(res));
      dispatch(deleteSignUpError());
    })
    .catch((e) => {
      dispatch(recieveSignUpError(e.data));
      dispatch(deleteSignUpUserResponseSuccess());
    });
};

export const boundRegisterAdmin = (data: SignUpCredentials) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  registerAdminService(data);
};

export const boundActivateUser = (token: string) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  console.log("bound activating");
  activateUserService(token)
    .then((res) => {
      dispatch(recieveActivateUserResponseSuccess(res));
      dispatch(deleteActivateError());
    })
    .catch((e) => {
      dispatch(recieveActivateError(e.data));
      dispatch(deleteActivateUserResponseSuccess());
    });
};
