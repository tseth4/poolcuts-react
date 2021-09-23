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
import { cleanup, render } from "@testing-library/react";
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

  const [renders, setRender] = useState(0)

  useEffect(() => {
    // if (renders < 1) {
    //   localStorage.setItem(
    //     "cuts",
    //     '[{"cutId": 3,"barberId": {"id": 2,"userName": "admin_example","roles": "ROLE_ADMIN","firstName": "admin","lastName": "test","email": "admin@gmail.com"},"appointmentDate": "2021-09-22T23:48:23.947+0000","location": "Office"},{"cutId": 4,"barberId": {"id": 2,"userName": "admin_example","roles": "ROLE_ADMIN","firstName": "admin","lastName": "test","email": "admin@gmail.com"},"appointmentDate": "2021-09-25T23:48:23.947+0000","location": "Office"}]'
    //   );
    //   localStorage.setItem(
    //     "books",
    //     '[{"bookId": 7,"category": "haircut","cut": {"cutId": 6,"barberId": {"id": 2,"userName": "admin_example","roles": "ROLE_ADMIN","firstName": "admin","lastName": "test","email": "admin@gmail.com"},"appointmentDate": "2021-09-29T23:48:23.947+0000","location": "Office"},"client": {"id": 1,"userName": "user_example","roles": "ROLE_USER","firstName": "tristan","lastName": "setha","email": "poolcuts@gmail.com"}}]'
    //   );
    //   // localStorage.setItem('users', "[{'id': 1,'username': 'user_example','firstName': 'tristan','lastName': 'setha','email': 'poolcuts@gmail.com','roles': 'ROLE_USER'}]");
    // }
    // setRender(renders + 1)
  }, []);

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
