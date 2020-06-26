import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import HomeContainer from "./components/Home/HomeContainer";
import NavContainer from './components/Nav/NavContainer';
import FooterContainer from './components/Footer/FooterContainer';
import ServiceContainer from './components/Services/ServicesContainer';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import LoginContainer from './components/Login/LoginContainer';
// import './App.css';

//react.fc = functional component
const App: React.FC = () =>  {
  return (
    <React.Fragment>
      <NavContainer/>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomeContainer}/>
          <Route exact path='/services' component={ServiceContainer}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/contact' component={Contact}/>
          <Route exact path='/login' component={LoginContainer}/>
        </Switch>
      </BrowserRouter>
      <FooterContainer/>
    </React.Fragment>

  );
}

export default App;
