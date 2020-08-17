import React from "react";
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { AppState } from "../store";
import { User } from "../store/types/User";
import { FBUser, FBUserAuthResponse } from "../store/types/FBUser";


interface AdminRouteProps {
  // user: User[],
  // fbUser: FBUser[],
  component?: any,
  path?: any
}

interface AdminRouteState {}

type Props = AdminRouteProps & LinkStateProps;

const AdminRoute: React.FC<Props> = ({
  path,
  component,
  user,
  fbUser,
}: Props) => {
  if (
    (user !== undefined && user.length >= 1 && user[0].roles == "ROLE_ADMIN") ||
    (fbUser !== undefined && fbUser.length >= 1 && fbUser[0].roles == "ROLE_ADMIN")
  ) {
    console.log(fbUser);
    console.log("private success");
    return <Route exact path={path} component={component} />;
  } else {
    console.log("private route redirect");
    console.log(fbUser);
    return <Redirect to="/error" />;
    // <Redirect to="/login"/>;
  }
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUserAuthResponse[];
}

const mapStateToProps = (
  state: AppState,
  ownProps: AdminRouteProps
): LinkStateProps => ({
  user: state.user,
  fbUser: state.fbUser,
});

export default connect(mapStateToProps)(AdminRoute);
