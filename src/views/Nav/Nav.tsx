import { User } from "@store/types/Auth";
import React from "react";
import "./Nav.scss";

interface NavProps {
  currentUser: User | undefined;
  handleLogoutButton: () => void;
}

type Props = NavProps;

export const Nav: React.FC<Props> = ({
  handleLogoutButton,
  currentUser,
}: Props) => {
  let activeUser: any;
  let signUpButton: any;
  let userType: string = "";
  let profileView: any;

  if (currentUser != undefined) {
    activeUser = (
      <li>
        <a onClick={() => handleLogoutButton()}>Logout</a>
      </li>
    );
    profileView = (
      <li>
        <a href="/profile">Profile</a>
      </li>
    );
  } else {
    activeUser = (
      <li>
        <a href="/login">Login</a>
      </li>
    );
    signUpButton = (
      <li>
        <a href="/signup" className="signup">
          Sign up
        </a>
      </li>
    );
  }

  return (
    <div className="header">
      <a href="/" className="logo">
        <a>*</a>
        <div id="bars">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </a>

      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <ul className="menu">
        {profileView}
        <li>
          <a href="/services">Services</a>
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
