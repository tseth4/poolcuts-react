import { useAppDispatch } from "@store/index";
import { authenticateUserService } from "@store/mockServices/UserService";
import { getAuth } from "@store/selectors/index";
import { login, loginError, loginSuccess } from "@store/slices/authSlice";
import { LoginCredentials, User } from "@store/types/Auth";
import { IError } from "@store/types/Error";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import FacebookLogin from "../Login/FacebookLogin";
// import { MessageContext } from "";
import "./Login.scss";

interface LoginProps {}

interface LoginState {}

type Props = LoginProps & LoginState;

const Login: React.FC<Props> = () => {
  // const { exampleValue, setExampleValue } = useContext(MessageContext);

  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { isAuthenticated } = useSelector(getAuth);

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch();

  const _login = () => dispatch(login());
  const _loginSuccess = (payload: User) => dispatch(loginSuccess(payload));
  const _loginError = (payload: IError) => dispatch(loginError(payload));

  let buttonDisabled: boolean = true;
  let errorMessage: string = "";

  const [value, setValue] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const handleInputChange = (input: string) => (event: any) => {
    setValue({ ...value, [input]: event.target.value });
  };

  const handleLogin = (event: any) => {
    event.preventDefault();
    _login();
    authenticateUserService(value)
      .then((res) => {
        _loginSuccess(res);
      })
      .catch((err) => {
        _loginError(err);
      });
  };

  if (value.username.length > 1 && value.password.length > 1) {
    buttonDisabled = false;
  }

  if (isAuthenticated) {
    return (
      <React.Fragment>
        <Redirect to="/services" />
      </React.Fragment>
    );
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="form-container">
        <h3>Login</h3>
        <div className="form-container__textbox">
          <input
            type="text"
            id="uname"
            placeholder="Username"
            className="form-container__inpt"
            onChange={handleInputChange("username")}
          />
        </div>
        <div className="form-container__textbox">
          <input
            value={value.password}
            type="password"
            id="pword"
            placeholder="Password"
            className="form-container__inpt"
            onChange={handleInputChange("password")}
          />
        </div>

        <button
          disabled={buttonDisabled}
          type="submit"
          className="form-container__logbtn"
        >
          Login
        </button>
        <a className="form-container__signuplink" href="/signup">
          Sign up
        </a>
        <div className="form-container__btn-container">
          <a className="form-container__btnlink" href="/forgot-password">
            Forgot Password
          </a>
          <a className="form-container__btnlink" href="/info/username">
            Forgot Username
          </a>
        </div>
        <p className="login-error">{errorMessage}</p>
        <div>...</div>
        <p>
          <FacebookLogin />
        </p>
      </form>
      {/* <button onClick={() => handleGetAllCuts()}>get all cuts</button> */}
    </div>
  );
};

export default Login;
