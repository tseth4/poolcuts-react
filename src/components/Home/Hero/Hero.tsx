import React from "react";
import { Redirect, Link } from "react-router-dom";
import "./Hero.scss";

export default function Hero() {

  const handleClick = () => {
    console.log("click")
    return <Redirect to="/services"/>
  }
  return (
    <div className="hero-container">
      <div className="hero-container__content">
        <h1>Ce la vie</h1>
        <div className="hero-container__desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          voluptatibus.
        </div>
        <Link to="/services"><button className="hero-container__button">Book</button></Link>
      </div>
    </div>
  );
}
