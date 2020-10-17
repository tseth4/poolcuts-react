import { AppActions } from "../types";
import {
  User,
  LoginCredentials,
  SignUpResponse,
  SignUpCredentials,
  ActivationResponse,
  PasswordRequest, PasswordRequestResponse, PasswordResetResponse
} from "../types/User";
import { Dispatch } from "redux";
import {
  authenticateUserService,
  registerUserService,
  registerAdminService,
  activateUserService,
  sendPasswordResetRequestService,
  sendNewPasswordService,
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

export const recievePasswordRequestResponse = (response: PasswordRequestResponse): AppActions => {
  return {
    type: "SAVE_PASSWORDREQUEST_RESPONSE",
    passwordRequestResponse: response
  }
}

export const deletePasswordRequestResponse = ():AppActions => {
  return {
    type: "DELETE_PASSWORDREQUEST_RESPONSE"
  }
}

export const recievePasswordRequestError = (error: IError): AppActions => {
  return {
    type: "SAVE_PASSWORDREQUEST_ERROR",
    passwordRequestError: error
  }
}

export const deletePasswordRequestError = ():AppActions => {
  return {
    type: "DELETE_PASSWORDREQUEST_ERROR"
  }
}

export const recievePasswordResetResponse = (response: PasswordResetResponse):AppActions => {
  return {
    type: "SAVE_PASSWORDRESET_RESPONSE",
    passwordResetResponse: response
  }
}

export const deletePasswordResetResponse = (): AppActions => {
  return {
    type: "DELETE_PASSWORDRESET_RESPONSE"
  }
}

export const recievePasswordResetError = (error: IError):AppActions => {
  return {
    type: "SAVE_PASSWORDRESET_ERROR",
    passwordResetError: error
  }
}

export const deletePasswordResetError = ():AppActions => {
  return {
    type: "DELETE_PASSWORDRESET_ERROR"
  }
}

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

// sends the email to reset password
export const boundSendPasswordResetRequest = (email: string) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  sendPasswordResetRequestService(email)
    .then((res) => {
      dispatch(recievePasswordRequestResponse(res));
      dispatch(deletePasswordRequestError());
    })
    .catch((e) => {
      dispatch(recievePasswordRequestError(e.data))
      dispatch(deletePasswordRequestResponse())
    });
};

// after clicking link in email set new password and submit
export const boundSubmitNewPassword = (request: PasswordRequest) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  sendNewPasswordService(request)
    .then((res) => {
      dispatch(recievePasswordResetResponse(res))
      dispatch(deletePasswordResetError())
    })
    .catch((e) => {
      dispatch(recievePasswordResetError(e.data))
      dispatch(deletePasswordResetResponse())
    });
};
