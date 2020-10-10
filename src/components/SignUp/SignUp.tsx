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
import "./Signup.scss";

interface SignUpProps {}

interface SignUpState {}

type Props = SignUpProps & SignUpState;

//first name, last name, username, password, email, active
const SignUp: React.FC<Props> = ({}: Props) => {
  let buttonDisabled: boolean = true;
  let emailErrorMessage: string = "";
  let errorMessage: string = "";
  let buttonClass: string = "signupform-container__sbtn"

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
  })

  const handleInputChange = (input: string) => (event: any) => {
    setValue({ ...value, [input]: event.target.value });
  };

  const handleConfirmPass = (input: string) => (event: any) => {
    setConfirmPass(event.target.value);
  };

  const handleSignUp = (event: any) => {
    event.preventDefault();
    console.log("hello")
    // boundLoginUser(value);
    // window.location.reload();
  };

  // if form is filled out undisable button

  // --> email validation

  // --> confirm password matches passwod
  if (
    value.userName.length > 1 &&
    value.password.length > 7 &&
    value.firstName.length > 1 &&
    value.lastName.length > 1 &&
    validateEmail(value.email)
  ) {
    console.log("button enabled");
    buttonDisabled = false;
  }

  if(buttonDisabled) {
    buttonClass = "disabled"
  } else {
    buttonClass = "signupform-container__sbtn"

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
            type="text"
            placeholder="password"
            className="signupform-container__inpt"
            onChange={handleInputChange("password")}
          />
        </div>
        <div className="signupform-container__textbox">
          <input
            type="text"
            placeholder="confirm password"
            className="signupform-container__inpt"
            onChange={handleConfirmPass("")}
          />
        </div>
        <button
          disabled={buttonDisabled}
          type="submit"
          className={buttonClass}
        >
          Sign up
        </button>
        <p className="signup-error">{errorMessage}</p>
        <p className="signup-error">{emailErrorMessage}</p>
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
