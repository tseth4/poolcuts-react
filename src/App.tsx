import React, { useEffect, useState, useRef, useContext } from "react";
import NavContainer from "./components/Nav/NavContainer";
import FooterContainer from "./components/Footer/FooterContainer";
import { AppState } from "./store";
import { Provider } from "react-redux";
import AppRouter from "./routes";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "./store/selectors/index";
import {
  login,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
} from "./store/slices/authSlice";
import Splash from "./components/InitialPageLoad/Splash";
import useIntro from "./useIntro";
import { connect } from "react-redux";
import "./App.scss";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { cleanup } from "@testing-library/react";
import store from "./store";

import {
  MessageContext,
  TempContextInterface,
} from "./store/contexts/testContext";

interface AppTSProps {}
interface AppTSState {}

type Props = AppTSProps & AppTSState;
const App: React.FC<Props> = ({}: Props) => {

  const [exampleValue, setExampleValue] = useState("test");
  // ===========================================================================
  // Selectors
  // ===========================================================================
  const { currentUser, isAuthenticated, error, loading } = useSelector(getAuth);

  return (
    <MessageContext.Provider value={{ exampleValue, setExampleValue }}>
      <div className="main-container">
        <NavContainer />
        <AppRouter />
        <FooterContainer />
      </div>
    </MessageContext.Provider>
  );
};

export default App;
