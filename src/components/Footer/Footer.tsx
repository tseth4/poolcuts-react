import React from "react";

import { IconContext } from "react-icons";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

import "./Footer.scss";
export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-container__logo">Logo</div>
      <div className="footer-container__item">Poolcuts © 2020</div>
      <div className="footer-container__link">
        <div className="footer-container__link-element">
          <a href="https://www.instagram.com/seanycutz/">
            <IconContext.Provider value={{ color: "white", size: "18px" }}>
              <div>
                <FaInstagram />
              </div>
            </IconContext.Provider>
          </a>
        </div>
        <div className="footer-container__link-element">
          <a href="mailto:chaneysince88@gmail.com">
            <IconContext.Provider value={{ color: "white", size: "18px" }}>
              <div>
                <FaEnvelope />
              </div>
            </IconContext.Provider>
          </a>
        </div>
        <div className="footer-container__link-element">
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
