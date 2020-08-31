import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import HomeContainer from "./components/Home/HomeContainer";
import NavContainer from "./components/Nav/NavContainer";
import FooterContainer from "./components/Footer/FooterContainer";
import ServiceContainer from "./components/Services/ServicesContainer";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import BookFormContainer from "./components/BookForm/BookFormContainer";
import store from "./store";
import { Provider } from "react-redux";
import AppRouter from "./routes";
import './App.scss'
// import './App.css';

//react.fc = functional component
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
