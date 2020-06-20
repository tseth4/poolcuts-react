import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import HomeContainer from "./components/Home/HomeContainer";
import NavContainer from './components/Nav/NavContainer';
import FooterContainer from './components/Footer/FooterContainer';
// import './App.css';

//react.fc = functional component
const App: React.FC = () =>  {
  return (
    <React.Fragment>
      <NavContainer/>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomeContainer}/>
        </Switch>
      </BrowserRouter>
      <FooterContainer/>
    </React.Fragment>

  );
}

export default App;
