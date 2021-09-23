import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import HomeContainer from "@views/Home/HomeContainer";
import About from "src/views/About/About";
import Contact from "@views/Contact/Contact";
import Login from "@views/Login/Login";
import BookFormContainer from "@views/BookForm/BookFormContainer";
import PrivateRoute from "./PrivateRoute";
import ProfileContainer from "@views/Profile/ProfileContainer";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <PrivateRoute path="/services" component={BookFormContainer} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/profile" component={ProfileContainer} />
    </Switch>
  </Router>
);

export default AppRouter;
