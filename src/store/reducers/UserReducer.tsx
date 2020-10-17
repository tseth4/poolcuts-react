import {
  ActivationResponse,
  PasswordRequestResponse,
  PasswordResetResponse,
  SignUpResponse,
  User,
} from "../types/User";
import { UserActionTypes } from "../types/User";

import { IError } from "../types/Error";

const authErrorReducerDefaultState: IError[] = [];

const authErrorReducer = (
  state = authErrorReducerDefaultState,
  action: UserActionTypes
): Error[] | any => {
  switch (action.type) {
    case "SAVE_AUTH_ERROR":
      return action.authError;
    case "DELETE_AUTH_ERROR":
      return [];
    default:
      return state;
  }
};

const userReducerDefaultState: User[] = [];
const userReducer = (
  state = userReducerDefaultState,
  action: UserActionTypes
): User[] | any => {
  switch (action.type) {
    case "SAVE_USER":
      return [action.user];
    case "DELETE_USER":
      // console.log(action)
      return [];
    default:
      return state;
  }
};

const signUpUserResponseSuccessReducerDefaultState: SignUpResponse = {};
const signUpUserResponseReducer = (
  state = signUpUserResponseSuccessReducerDefaultState,
  action: UserActionTypes
): SignUpResponse | any => {
  switch (action.type) {
    case "SAVE_SIGNUPUSERRESPONSE":
      return action.signUpUserResponse;
    case "DELETE_SIGNUPUSERRESPONSE":
      return {};
    default:
      return state;
  }
};

const signUpErrorReducerDefaultState: IError = {};

const signUpErrorReducer = (
  state = signUpErrorReducerDefaultState,
  action: UserActionTypes
): Error[] | any => {
  switch (action.type) {
    case "SAVE_SIGNUP_ERROR":
      return action.signUpError;
    case "DELETE_SIGNUP_ERROR":
      return {};
    default:
      return state;
  }
};

const activateUserResponseReducerDefaultState: ActivationResponse = {};

const activateUserResponseReducer = (
  state = activateUserResponseReducerDefaultState,
  action: UserActionTypes
): ActivationResponse | any => {
  switch (action.type) {
    case "SAVE_ACTIVATEUSERRESPONSE":
      return action.activateUserResponse;
    case "DELETE_ACTIVATEUSERRESPONSE":
      return {};
    default:
      return state;
  }
};

const activateUserErrorReducerDefaultState: IError = {};

const activateUserErrorReducer = (
  state = activateUserErrorReducerDefaultState,
  action: UserActionTypes
): Error | any => {
  switch (action.type) {
    case "SAVE_ACTIVATE_ERROR":
      return action.activateError;
    case "DELETE_ACTIVATE_ERROR":
      return {};
    default:
      return state;
  }
};

const passwordRequestResponseReducerDefaultState: PasswordRequestResponse = {};
const passwordRequestResponseReducer = (
  state = passwordRequestResponseReducerDefaultState,
  action: UserActionTypes
): PasswordRequestResponse | any => {
  switch (action.type) {
    case "SAVE_PASSWORDREQUEST_RESPONSE":
      return action.passwordRequestResponse;
    case "DELETE_PASSWORDREQUEST_RESPONSE":
      return {};
    default:
      return state
  }
};
const passwordResetResponseReducerDefaultState: PasswordResetResponse = {};
const passwordResetResponseReducer = (
  state = passwordResetResponseReducerDefaultState,
  action: UserActionTypes
): PasswordResetResponse | any => {
  switch (action.type) {
    case "SAVE_PASSWORDRESET_RESPONSE":
      return action.passwordResetResponse;
    case "DELETE_PASSWORDRESET_RESPONSE":
      return {};
    default:
      return state
  }
};
const passwordRequestErrorReducerDefaultState: IError = {};
const passwordRequestErrorReducer = (
  state = passwordRequestErrorReducerDefaultState,
  action: UserActionTypes
): IError | any => {
  switch (action.type) {
    case "SAVE_PASSWORDREQUEST_ERROR":
      return action.passwordRequestError;
    case "DELETE_PASSWORDREQUEST_ERROR":
      return {};
    default:
      return state
  }
};
const passwordResetErrorReducerDefaultState: IError = {};
const passwordResetErrorReducer = (
  state = passwordResetErrorReducerDefaultState,
  action: UserActionTypes
): IError | any => {
  switch (action.type) {
    case "SAVE_PASSWORDRESET_ERROR":
      return action.passwordResetError;
    case "DELETE_PASSWORDRESET_ERROR":
      return {};
    default:
      return state
  }
};

export {
  userReducer,
  signUpUserResponseReducer,
  signUpErrorReducer,
  authErrorReducer,
  activateUserResponseReducer,
  activateUserErrorReducer,
  passwordRequestResponseReducer,
  passwordResetResponseReducer,
  passwordRequestErrorReducer,
  passwordResetErrorReducer
};
