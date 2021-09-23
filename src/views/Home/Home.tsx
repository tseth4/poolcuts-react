import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import { IconContext } from "react-icons";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import "./Home.scss";
export default function home() {
  return (
    <div className="home-container">
      <HeroContainer />
      <div className="home-container__link-container">
        <div className="home-container__link-element">
          <a href="https://www.instagram.com/seanycutz/">
            <IconContext.Provider value={{ color: "white", size: "18px" }}>
              <div>
                <FaInstagram />
              </div>
            </IconContext.Provider>
          </a>
        </div>
        <div className="home-container__link-element">
          <a href="mailto:chaneysince88@gmail.com">
            <IconContext.Provider value={{ color: "white", size: "18px" }}>
              <div>
                <FaEnvelope />
              </div>
            </IconContext.Provider>
          </a>
        </div>
        <div className="home-container__link-element">
          <a href="https://twitter.com/kanyewest">
            <IconContext.Provider value={{ color: "white", size: "18px" }}>
              <div>
                <FaTwitter />
              </div>
            </IconContext.Provider>
          </a>
        </div>
      </div>
    </div>
  );
}
