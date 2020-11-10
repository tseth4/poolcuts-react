import React from "react";
import { IconContext } from "react-icons";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import "./Contact.scss";
export default function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <p><b>Phone:</b> (206)-000-0000</p>
      <div className="contact-container__link-container">
        <div className="contact-container__link-element">
          <a href="https://www.instagram.com/seanycutz/">
            <IconContext.Provider value={{ color: "black", size: "18px" }}>
              <div>
                <FaInstagram />
              </div>
            </IconContext.Provider>
          </a>
        </div>
        <div className="contact-container__link-element">
          <a href="mailto:chaneysince88@gmail.com">
            <IconContext.Provider value={{ color: "black", size: "18px" }}>
              <div>
                <FaEnvelope />
              </div>
            </IconContext.Provider>
          </a>
        </div>
        <div className="contact-container__link-element">
          <a href="https://twitter.com/kanyewest">
            <IconContext.Provider value={{ color: "black", size: "18px" }}>
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
