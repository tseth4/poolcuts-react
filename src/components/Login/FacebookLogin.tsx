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
  let errorMessage: string = "";

  // const [state, setState] = useState<FBUser>({
  // });
  const responseFacebook = (response: any) => {
    if (response.status != "unknown") {
      if (response.name == undefined){
        sessionStorage.clear();
      }
      if (response.error){
        console.log(response.error)
        errorMessage = response.error.message;
        console.log(errorMessage);
        
        // window.location.reload();
      } else {
        console.log(response);
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
    }
  };

  if (fbUser.length > 0) {
    return (
      <React.Fragment>
        <Redirect to="/services" />
      </React.Fragment>
    );
  }
  if (errorMessage){
    console.log(errorMessage)

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
      <p>{errorMessage}</p>
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
