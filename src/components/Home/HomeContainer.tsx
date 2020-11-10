import React, { useState, useEffect, useRef } from "react";
import Home from "./Home";
import Splash from "../InitialPageLoad/Splash";
import { AppState } from "../../store";
import { AppActions } from "../../store/types";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { boundLoadPage } from "../../store/actions/SplashPageActions";

interface HomeContainerProps {}
interface HomeContainerState {}

type Props = HomeContainerProps &
  HomeContainerState &
  LinkDispatchToProps &
  LinkStateProps;
const HomeContainer = ({ boundLoadPage, loadPage }: Props) => {

  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
};

interface LinkStateProps {
  loadPage: boolean;
}

interface LinkDispatchToProps {
  boundLoadPage: (load: boolean) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: HomeContainerProps
): LinkStateProps => ({
  loadPage: state.loadPage,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: HomeContainerProps
): LinkDispatchToProps => ({
  boundLoadPage: bindActionCreators(boundLoadPage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
