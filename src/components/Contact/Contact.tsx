import React from "react";
import "./Contact.scss";
export default function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <div className="contact-container__row">
        <div className="contact-container__row-item">
          <a href="https://twitter.com/kanyewest">mail</a>
        </div>
      </div>
      <div className="contact-container__row">
        <div className="contact-container__row-item">
          <a href="https://twitter.com/kanyewest">twitter</a>
        </div>
      </div>
      <div className="contact-container__row">
        <div className="contact-container__row-item">
          <a href="https://www.instagram.com/avant.arte/">instagram</a>
        </div>
      </div>
      <div className="contact-container__row">
        <div className="contact-container__row-item">
          <a href="https://www.instagram.com/avant.arte/">phone</a>
        </div>
      </div>
    </div>
  );
}
