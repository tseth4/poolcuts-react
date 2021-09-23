import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { User } from "@store/types/Auth";
import { AppState } from "@store/index";
import { connect } from "react-redux";
import { FBUser, FBUserAuthResponse } from "@store/types/FBUser";
import { getAuth } from "@store/selectors/index";



interface PrivateRouteProps {
  component?: any;
  path?: any;
}

type Props = PrivateRouteProps;
const PrivateRoute: React.FC<Props> = ({ component, path }: Props) => {
  const { isAuthenticated, currentUser, loading } = useSelector(getAuth);
  if (isAuthenticated) {
    return <Route exact path={path} component={component} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
