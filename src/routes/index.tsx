import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import HomeContainer from "../components/Home/HomeContainer";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Login from "../components/Login/Login";
import BookFormContainer from "../components/BookForm/BookFormContainer";
import PrivateRoute from "./PrivateRoute";
import ProfileContainer  from "../components/Profile/ProfileContainer";
import ErrorRoute from "./ErrorRoute";
import AdminRoute from "./AdminRoute";
import CutFormContainer from "../components/CutForm/CutFormContainer";
import SignUp from "../components/SignUp/SignUp";
import ConfirmationSent from "../components/SignUp/ConfirmationSent";
import ConfirmationLink from "../components/SignUp/ConfirmationLink";
import NewPasswordForm from "../components/PasswordReset/NewPasswordForm";
import EmailSubmitForm from "../components/PasswordReset/EmailSubmitForm";
import UserIdInfo from "../components/UseridInfo/UserIdInfo";
import UserIdEmailSubmitForm from "../components/UseridInfo/UserIdEmailSubmitForm";
// import './App.css';

export const history = createHistory();

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <PrivateRoute path="/services" component={BookFormContainer} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/error" component={ErrorRoute}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/signup/:sent" component={ConfirmationSent}/>
        <Route exact path="/confirmation/:token" component={ConfirmationLink}/>
        <Route exact path="/passwordreset/:token" component={NewPasswordForm}/>
        <Route exact path="/info/username" component={UserIdEmailSubmitForm}/>
        <Route exact path="/info/username/:email/:token" component={UserIdInfo}/>
        <Route exact path="/forgot-password" component={EmailSubmitForm}/>
        <PrivateRoute path="/profile" component={ProfileContainer}/>
        <AdminRoute path="/cut/new" component={CutFormContainer}/>
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
