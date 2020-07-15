import React, { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { User } from "../../store/types/User";
import { AppState } from "../../store";
import { connect } from "react-redux";
import { userInfo } from "os";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { bindActionCreators } from "redux";
import { boundLogoutUser } from "../../store/actions/UserActions";
import { boundLogoutFBUser } from "../../store/actions/FBUserActions";

import { FBUser } from "../../store/types/FBUser";
// import { profile } from 'console';

interface NavContainerProps {
  user?: User[];
  fbUser?: FBUser[]; 
}

interface NavContainerState {}

type Props = NavContainerProps & NavContainerState & LinkDispatchToProps & LinkStateProps;
const NavContainer: React.FC<Props> = ({ user, fbUser, boundLogoutUser, boundLogoutFBUser }: Props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(user.length > 0 || fbUser.length > 0 ? true : false);

  // useEffect(() => {
  //   window.location.reload();
  // })

  console.log(fbUser.length);
  console.log(user.length);

  if (fbUser){
    console.log(fbUser);
  } else if (user){
    console.log(user);
  }

  const handleLogoutButton = () => {
    console.log("logiongout")
    if (user.length > 0) {
      console.log("logiongout user")
      boundLogoutUser(user[0].username);
      window.location.reload();
    }
    if (fbUser.length > 0 ){
      console.log("logiongout fbbb user");
      console.log(fbUser);
      boundLogoutFBUser();
    }
    // console.log("inisde handle login" + isLoggedIn);
  };


  let navProps = {
    isLoggedIn: isLoggedIn,
    handleLogoutButton: handleLogoutButton,
  };

  return <Nav {...navProps} />;
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUser[];
}

interface LinkDispatchToProps {
  boundLogoutUser: (id: string) => void;
  boundLogoutFBUser: () => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: NavContainerProps
): LinkStateProps => ({
  user: state.user,
  fbUser: state.fbUser
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: NavContainerProps
): LinkDispatchToProps => ({
  boundLogoutUser: bindActionCreators(boundLogoutUser, dispatch),
  boundLogoutFBUser: bindActionCreators(boundLogoutFBUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
