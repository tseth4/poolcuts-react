import React from "react";
import { Nav } from "./Nav";
import { User } from "../../store/types/User";
import { AppState } from "../../store";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { bindActionCreators } from "redux";
import { boundLogoutUser } from "../../store/actions/UserActions";
import { boundLogoutFBUser } from "../../store/actions/FBUserActions";

import { FBUserAuthResponse } from "../../store/types/FBUser";

interface NavContainerProps {
  user?: User[];
  fbUser?: FBUserAuthResponse[];
}

interface NavContainerState {}

type Props = NavContainerProps &
  NavContainerState &
  LinkDispatchToProps &
  LinkStateProps;
const NavContainer: React.FC<Props> = ({
  user,
  fbUser,
  boundLogoutUser,
  boundLogoutFBUser,
}: Props) => {
  const handleLogoutButton = () => {
    if (user.length > 0) {
      boundLogoutUser(user[0].username);
      window.location.reload();
    }
    if (fbUser.length > 0) {
      boundLogoutFBUser();
      window.location.reload();
    }
  };

  let navProps = {
    handleLogoutButton: handleLogoutButton,
    user: user,
    fbUser: fbUser,
  };

  console.log("nav main components");
  return <Nav {...navProps} />;
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUserAuthResponse[];
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
  fbUser: state.fbUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: NavContainerProps
): LinkDispatchToProps => ({
  boundLogoutUser: bindActionCreators(boundLogoutUser, dispatch),
  boundLogoutFBUser: bindActionCreators(boundLogoutFBUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
