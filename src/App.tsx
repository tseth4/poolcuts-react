import React from "react";
import NavContainer from "./components/Nav/NavContainer";
import FooterContainer from "./components/Footer/FooterContainer";
import store from "./store";
import { Provider } from "react-redux";
import AppRouter from "./routes";
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="main-container">
      <Provider store={store}>
        <NavContainer />
        <div className="appcontainer">
        <AppRouter />
        </div>
        <FooterContainer />
      </Provider>
    </div>
  );
};

export default App;
