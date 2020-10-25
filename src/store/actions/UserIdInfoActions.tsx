import { Dispatch } from "react";
import { AppState } from "..";
import { AppActions } from "../types";
import { IError } from "../types/Error";
import {
  UserIdInfoRequestResponse,
  UserIdInfoWithTokenRequest,
  UserIdInfoWithTokenRequestResponse,
} from "../types/UserIdInfo";
import {
  sendUserIdInfoRequestService,
  getUserIdInfoWithTokenService,
} from "../services/UserService";

export const recieveUserIdInfoRequestResponse = (
  userIdInfoRequestResponse: UserIdInfoRequestResponse
): AppActions => {
  return {
    type: "SAVE_USERIDINFOREQUEST_RESPONSE",
    userIdInfoRequestResponse: userIdInfoRequestResponse,
  };
};

export const deleteUserIdInfoRequestResponse = (): AppActions => {
  return {
    type: "DELETE_USERIDINFOREQUEST_RESPONSE",
  };
};

export const recieveUserIdInfoRequestError = (error: IError): AppActions => {
  return {
    type: "SAVE_USERIDINFOREQUEST_ERROR",
    userIdInfoRequestError: error,
  };
};

export const deleteUserIdInfoRequestError = (): AppActions => {
  return {
    type: "DELETE_USERIDINFOREQUEST_ERROR",
  };
};

export const boundSendUserInfoRequest = (email: string) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  sendUserIdInfoRequestService(email)
    .then((res) => {
      dispatch(recieveUserIdInfoRequestResponse(res));
      dispatch(deleteUserIdInfoRequestError());
    })
    .catch((e) => {
      dispatch(recieveUserIdInfoRequestError(e.data));
      dispatch(deleteUserIdInfoRequestResponse());
    });
};

export const recieveUserIdInfoWithTokenRequestResponse = (
  response: UserIdInfoWithTokenRequestResponse
): AppActions => {
  return {
    type: "SAVE_USERIDINFOWITHTOKENREQUEST_RESPONSE",
    userIdInfoWithTokenRequestResponse: response,
  };
};

export const deleteUserIdInfoWithTokenRequestResponse = (): AppActions => {
  return {
    type: "DELETE_USERIDINFOWITHTOKENREQUEST_RESPONSE",
  };
};

export const recieveUserIdInfoWithTokenRequestError = (
  error: IError
): AppActions => {
  return {
    type: "SAVE_USERIDINFOWITHTOKENREQUEST_ERROR",
    userIdInfoWithTokenRequestError: error,
  };
};

export const deleteUserIdInfoWithTokenRequestError = (): AppActions => {
  return {
    type: "DELETE_USERIDINFOWITHTOKENREQUEST_ERROR",
  };
};

export const boundGetUserIdInfo = (data: UserIdInfoWithTokenRequest) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  getUserIdInfoWithTokenService(data)
    .then((res) => {
      dispatch(deleteUserIdInfoWithTokenRequestError());
      dispatch(recieveUserIdInfoWithTokenRequestResponse(res));
    })
    .catch((e) => {
      dispatch(deleteUserIdInfoWithTokenRequestResponse());
      dispatch(recieveUserIdInfoWithTokenRequestError(e.data));
    });
};
