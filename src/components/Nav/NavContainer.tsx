import React from "react";
import { Nav } from "./Nav";
import { User } from "@store/types/Auth";

import { useSelector } from "react-redux";
import { getAuth } from "@store/selectors/index";

import { logout } from "@store/slices/authSlice";
import { useAppDispatch } from "@store/index";

import { FBUserAuthResponse } from "@store/types/FBUser";

import { Redirect } from "react-router-dom";

interface NavContainerProps {
  user?: User[];
  fbUser?: FBUserAuthResponse[];
}

interface NavContainerState {}

type Props = NavContainerProps & NavContainerState;
const NavContainer: React.FC<Props> = ({}: Props) => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { currentUser } = useSelector(getAuth);

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch();
  const _logout = () => dispatch(logout());

  const handleLogoutButton = () => {
    _logout();
    sessionStorage.clear();
    window.location.reload();
  };

  let navProps = {
    handleLogoutButton: handleLogoutButton,
    currentUser: currentUser,
    // fbUser: fbUser,
  };

  // console.log("nav main components");
  return <Nav {...navProps} />;
};

export default NavContainer;
