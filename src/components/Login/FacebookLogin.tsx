import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactFacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { FBUser } from "../../store/types/FBUser";
import { AppState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { boundLoginFBUser } from "../../store/actions/FBUserActions";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router";

interface FacebookLoginProps {
  fbUser?: FBUser[];
}

interface FacebookLoginState {}

type Props = FacebookLoginProps &
  LinkDispatchToProps &
  LinkStateProps &
  FacebookLoginState;

const FacebookLogin: React.FC<Props> = ({
  fbUser,
  boundLoginFBUser,
}: Props) => {
  const [state, setState] = useState<FBUser>({
    id: undefined,
    accessToken: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
  });
  const responseFacebook = (response: any) => {
    console.log("response facebook called");
    console.log(response);
    if (response.status != "unknown") {
      let name = response.name.split(" ");
      let firstName = name[0];
      let lastName = name.length == 3 ? name[2] : name[1];
      boundLoginFBUser({
        id: response.id,
        accessToken: response.accessToken,
        email: response.email,
        firstName: firstName,
        lastName: lastName,
      });
    }
    // boundLoginFBUser(state);
  };

  if (fbUser.length > 0) {
    return (
      <React.Fragment>
        <Redirect to="/" />
      </React.Fragment>
    );
  }

  const componentClicked = () => console.log("clicked");

  return (
    <React.Fragment>
      <ReactFacebookLogin
        appId="592756961637659"
        autoLoad={false}
        fields="id,name,email"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </React.Fragment>
  );
};

interface LinkStateProps {
  fbUser: FBUser[];
}

interface LinkDispatchToProps {
  boundLoginFBUser: (value: FBUser) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: FacebookLoginProps
): LinkStateProps => ({
  fbUser: state.fbUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: FacebookLoginProps
): LinkDispatchToProps => ({
  boundLoginFBUser: bindActionCreators(boundLoginFBUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin);
