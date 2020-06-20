import React from 'react';
import HeroContainer from './Hero/HeroContainer';
import './Home.scss';
export default function home() {
  return (
    <React.Fragment >
      <div className="home-parent-container">
        <HeroContainer/>
        <div className="home-container">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </React.Fragment>
  )
}
