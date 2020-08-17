import React, { useState, useEffect } from "react";
import "./Nav.scss";
import { User } from "../../store/types/User";
import { connect } from "react-redux";
import { userInfo } from "os";
import { AppState } from "../../store";
import { stringify } from "querystring";
import { FBUserAuthResponse } from "../../store/types/FBUser";

interface NavProps {
  handleLogoutButton: () => void;
  user: User[];
  fbUser: FBUserAuthResponse[];
}

type Props = NavProps;

export const Nav: React.FC<Props> = ({
  handleLogoutButton,
  user,
  fbUser,
}: Props) => {
  let activeUser: any;
  let signUpButton: any;
  let dashboardLink: any;
  let temp_role: string;
  let userType: string = "";
  let profileView: any;

  // const [userType, setUserType] = useState <string> ();
  if (fbUser.length > 0) {
    userType = fbUser[0].roles;
  } else if (user.length > 0) {
    userType = user[0].roles;
  }

  if (
    (user.length > 0 && user[0].roles != undefined) ||
    (fbUser.length > 0 && fbUser[0] != undefined)
  ) {
    activeUser = (
      <li>
        <a onClick={() => handleLogoutButton()}>Logout</a>
      </li>
    );
    profileView = (
      <li>
        <a href="/profile">profile</a>
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
        <a className="signup">Sign up</a>
      </li>
    );
  }

  return (
    <div className="header">
      <a href="/" className="logo">
        <b>logo.</b>
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

// export { Nav };
