import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../store";
import { boundRegisterUser } from "../../store/actions/UserActions";
import { signUpErrorReducer } from "../../store/reducers/UserReducer";
import { AppActions } from "../../store/types";
import { IError } from "../../store/types/Error";
import { SignUpCredentials, SignUpResponse } from "../../store/types/User";
import { isEmpty, validateEmail } from "../../utils/Functions";
import { Redirect, Route, RouteProps } from "react-router";

import "./Signup.scss";

interface SignUpProps {}

interface SignUpState {}

type Props = SignUpProps & SignUpState & LinkDispatchToProps & LinkStateProps;

//first name, last name, username, password, email, active
const SignUp: React.FC<Props> = ({
  signUpError,
  boundRegisterUser,
  signUpUserResponse,
}: Props) => {
  let buttonDisabled: boolean = true;
  let emailErrorMessage: string = "";
  let errorMessage: string = "";
  let buttonClass: string = "signupform-container__sbtn";
  let confirmPassError: string = "";
  let passLengthError: string = "";

  const [confirmPass, setConfirmPass] = useState();

  const [value, setValue] = useState({
    userName: "",
    password: "",
    active: true,
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    console.log(buttonDisabled);
    console.log(signUpError);
    console.log(signUpUserResponse);
  });

  const handleInputChange = (input: string) => (event: any) => {
    setValue({ ...value, [input]: event.target.value });
  };

  const handleConfirmPass = (input: string) => (event: any) => {
    setConfirmPass(event.target.value);
  };

  const handleSignUp = (event: any) => {
    event.preventDefault();
    console.log("hello");
    boundRegisterUser(value);
  };

  if (
    value.userName.length > 1 &&
    value.password.length >= 7 &&
    value.firstName.length > 1 &&
    value.lastName.length > 1 &&
    validateEmail(value.email) &&
    confirmPass == value.password
  ) {
    console.log("button enabled");
    buttonDisabled = false;
  }

  if (buttonDisabled) {
    buttonClass = "disabled";
  } else {
    buttonClass = "signupform-container__sbtn";
  }

  if (!validateEmail(value.email) && value.email.length > 0) {
    emailErrorMessage = "please enter valid email";
  } else {
    emailErrorMessage = "";
  }

  if (confirmPass != value.password && value.password.length > 0) {
    confirmPassError = "passwords must match";
  } else {
    confirmPassError = "";
  }

  if (value.password.length < 7 && value.password.length > 0) {
    passLengthError = "password must be at least 7 characters";
  } else {
    passLengthError = "";
  }

  if (!isEmpty(signUpUserResponse)) {
    return <Redirect to={`signup/${signUpUserResponse.email}`} />;
  }

  return (
    <div className="signup-container">
      <h1 style={{ color: "white" }}>Sign up</h1>
      <form onSubmit={handleSignUp} className="signupform-container">
        <div className="signupform-container__textbox">
          <input
            type="text"
            placeholder="first name"
            className="signupform-container__inpt"
            onChange={handleInputChange("firstName")}
          />
        </div>
        <div className="signupform-container__textbox">
          <input
            type="text"
            placeholder="last name"
            className="signupform-container__inpt"
            onChange={handleInputChange("lastName")}
          />
        </div>
        <div className="signupform-container__textbox">
          <input
            type="text"
            placeholder="email eg. example@example.com"
            className="signupform-container__inpt"
            onChange={handleInputChange("email")}
          />
        </div>
        <div className="signupform-container__textbox">
          <input
            type="text"
            placeholder="username"
            className="signupform-container__inpt"
            onChange={handleInputChange("userName")}
          />
        </div>
        <div className="signupform-container__textbox">
          <input
            type="password"
            placeholder="password"
            className="signupform-container__inpt"
            onChange={handleInputChange("password")}
          />
        </div>
        <div className="signupform-container__textbox">
          <input
            type="password"
            placeholder="confirm password"
            className="signupform-container__inpt"
            onChange={handleConfirmPass("")}
          />
        </div>
        <button disabled={buttonDisabled} type="submit" className={buttonClass}>
          Sign up
        </button>
        <p className="signup-error">{errorMessage}</p>
        <p className="signup-error">{emailErrorMessage}</p>
        <p className="signup-error">{confirmPassError}</p>
        <p className="signup-error">{passLengthError}</p>
      </form>
    </div>
  );
};

interface LinkStateProps {
  signUpUserResponse: SignUpResponse;
  signUpError: IError;
}

interface LinkDispatchToProps {
  boundRegisterUser: (value: SignUpCredentials) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: SignUpProps
): LinkStateProps => ({
  signUpUserResponse: state.signUpUserResponse,
  signUpError: state.signUpError,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: SignUpProps
): LinkDispatchToProps => ({
  boundRegisterUser: bindActionCreators(boundRegisterUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
