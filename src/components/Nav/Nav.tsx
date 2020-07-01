import React, { useState } from "react";
import "./Nav.scss";

interface Props {
  isLoggedIn: boolean;
  handleLoginButton: () => void;
}
export const Nav: React.FC<Props> = ({
  isLoggedIn,
  handleLoginButton,
}: Props) => {
  let activeUser: any;
  let signUpButton: any;

  if (isLoggedIn) {
    activeUser = (
      <li>
        <a onClick={() => handleLoginButton()}>Logout</a>
      </li>
    );
  } else {
    activeUser = (
      <li>
        <a onClick={() => handleLoginButton()}>Login</a>
      </li>
    );
    signUpButton = (
      <li>
        <a className="signup">Sign up</a>
      </li>
    );
  }

  return (
    <div className="header">
      <a href="/" className="logo">
        <b>logo.</b>
      </a>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <ul className="menu">
        <li>
          <a href="/book">Services</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        {activeUser}
        {signUpButton}
      </ul>
    </div>
  );
};
