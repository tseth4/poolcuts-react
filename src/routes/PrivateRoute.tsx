import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import { User } from '../store/types/User';
import { AppState } from '../store';
import { connect } from "react-redux";

interface PrivateRouteProps {
  user?: User[]
  component?: any,
  path?: any
}

interface PrivateRouteState {}

type Props = PrivateRouteProps
const PrivateRoute: React.FC<Props> = ({ user, component, path }: Props) => {
  if (user == undefined || user.length < 1){
    return <Redirect to="/login"/>;
  } 

  if (user) console.log(user);

  return (
    <Route
    exact path={path}
    component={component}
    />
  )
}

interface LinkStateProps {
  user: User[];
}

const mapStateToProps =(
  state: AppState,
  ownProps: PrivateRouteProps
): LinkStateProps => ({
  user: state.user
})

export default connect( mapStateToProps )(PrivateRoute);