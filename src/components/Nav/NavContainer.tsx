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
// import { profile } from 'console';

interface NavContainerProps {
  user?: User[];
}

interface NavContainerState {}

type Props = NavContainerProps & NavContainerState & LinkDispatchToProps & LinkStateProps;
const NavContainer: React.FC<Props> = ({ user, boundLogoutUser }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(user.length > 0 ? true : false);

  // useEffect(() => {
  //   window.location.reload();
  // })

  const handleLogoutButton = () => {
    console.log(user);
    if (user.length > 0) {
      console.log(user);
      boundLogoutUser(user[0].username);
      window.location.reload();
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
}

interface LinkDispatchToProps {
  boundLogoutUser: (id: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: NavContainerProps
): LinkStateProps => ({
  user: state.user,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: NavContainerProps
): LinkDispatchToProps => ({
  boundLogoutUser: bindActionCreators(boundLogoutUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
