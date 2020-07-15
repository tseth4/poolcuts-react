import React, { useState } from "react";
import { connect } from "react-redux";
import "./Login.scss";
import { User, LoginCredentials } from "../../store/types/User";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { boundLoginUser } from "../../store/actions/UserActions";
import { bindActionCreators } from "redux";
import { AppState } from "../../store";
import { Redirect, Route, RouteProps } from "react-router";
import FacebookLogin  from "../Login/FacebookLogin";

interface LoginProps {
  user?: User[];
}

interface LoginState {}

type Props = LoginProps & LinkDispatchToProps & LinkStateProps & LoginState;

const Login: React.FC<Props> = ({ user, boundLoginUser }: Props) => {
  let buttonDisabled: boolean = true;

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (input: string) => (event: any) => {
    setValue({ ...value, [input]: event.target.value });
  };

  const handleLogin = (event: any) => {
    event.preventDefault();
    boundLoginUser(value);
  };

  if (value.username.length > 1 && value.password.length > 1) {
    buttonDisabled = false;
  }

  if (user.length > 0) {
    return (
      <React.Fragment>
        <Redirect to="/" />
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
        <p><FacebookLogin/></p>
      </form>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
}

interface LinkDispatchToProps {
  boundLoginUser: (value: LoginCredentials) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: LoginProps
): LinkStateProps => ({
  user: state.user,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: LoginProps
): LinkDispatchToProps => ({
  boundLoginUser: bindActionCreators(boundLoginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
