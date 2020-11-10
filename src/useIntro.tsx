import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "./store";
import { AppActions } from "./store/types";
import { boundLoadPage } from "./store/actions/SplashPageActions";

const useIntro = () => {
  // const renders = useRef(0);

  // useEffect(() => {
  //   if (renders.current == 0) {
  //     boundLoadPage(true);
  //   } else {
  //     boundLoadPage(false);
  //   }

  //   setTimeout(() => {
  //     renders.current++;
  //   }, 2000);
  // }, []);
};

export default useIntro;
