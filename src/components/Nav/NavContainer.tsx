import { useAppDispatch } from "@store/index";
import { getAuth } from "@store/selectors/index";
import { logout } from "@store/slices/authSlice";
import { User } from "@store/types/Auth";
import { FBUserAuthResponse } from "@store/types/FBUser";
import React from "react";
import { useSelector } from "react-redux";
import { Nav } from "./Nav";

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
  };
  return <Nav {...navProps} />;
};

export default NavContainer;
