import React, { useEffect, useState, useRef } from "react";
import NavContainer from "./components/Nav/NavContainer";
import FooterContainer from "./components/Footer/FooterContainer";
import { AppState } from "./store";
import { Provider } from "react-redux";
import AppRouter from "./routes";
import Splash from "./components/InitialPageLoad/Splash";
import useIntro from "./useIntro";
import { connect } from "react-redux";
import "./App.scss";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "./store/types";
import { boundLoadPage } from "./store/actions/SplashPageActions";
import { bindActionCreators } from "redux";
import { cleanup } from "@testing-library/react";
import store from "./store";

interface AppTSProps {}
interface AppTSState {}

type Props = AppTSProps & AppTSState & LinkDispatchToProps & LinkStateProps;
const App: React.FC<Props> = ({ loadPage, boundLoadPage }: Props) => {

  useEffect(() => {
    setTimeout(() => {
      boundLoadPage(false);
    }, 2000);
  }, []);

  if (loadPage == true) {
    return (
      <React.Fragment>
        <Splash />
      </React.Fragment>
    );
  }
  return (
    <div className="main-container">
      <NavContainer />
      <AppRouter />
      <FooterContainer />
    </div>
  );
  // }
};

interface LinkStateProps {
  loadPage: boolean;
}

interface LinkDispatchToProps {
  boundLoadPage: (load: boolean) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: AppTSProps
): LinkStateProps => ({
  loadPage: state.loadPage,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: AppTSProps
): LinkDispatchToProps => ({
  boundLoadPage: bindActionCreators(boundLoadPage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
