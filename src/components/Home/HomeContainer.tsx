import React, { useState, useEffect, useRef } from "react";
import Home from "./Home";
import Splash from "../InitialPageLoad/Splash";
import { AppState } from "../../store";
// import { AppActions } from "../../store/types";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { boundLoadPage } from "../../store/actions/SplashPageActions";

interface HomeContainerProps {}
interface HomeContainerState {}

type Props = HomeContainerProps &
  HomeContainerState 
const HomeContainer = ({ }: Props) => {

  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
};


export default HomeContainer;
