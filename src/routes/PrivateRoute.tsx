import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import { User } from '../store/types/User';
import { AppState } from '../store';
import { connect } from "react-redux";
import { FBUser, FBUserAuthResponse } from '../store/types/FBUser';

interface PrivateRouteProps {
  // user?: User[],
  // fbUser?: FBUser[],
  component?: any,
  path?: any
}

interface PrivateRouteState {}

type Props = PrivateRouteProps & LinkStateProps;
const PrivateRoute: React.FC<Props> = ({ user, fbUser, component, path }: Props) => {
  if ((user !== undefined && user.length >= 1) || (fbUser !== undefined && fbUser.length >= 1)){
    console.log(fbUser)
    console.log("private success")
    return (
      <Route
      exact path={path}
      component={component}
      />
    )
  } else {
    console.log("private route redirect");
    console.log(fbUser)
    return <Redirect to="/login"/>
    // <Redirect to="/login"/>;
  }
}

interface LinkStateProps {
  user: User[];
  fbUser: FBUserAuthResponse[];
}

const mapStateToProps =(
  state: AppState,
  ownProps: PrivateRouteProps
): LinkStateProps => ({
  user: state.user,
  fbUser: state.fbUser
})

export default connect( mapStateToProps )(PrivateRoute);