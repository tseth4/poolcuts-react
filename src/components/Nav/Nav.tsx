import React, { useState } from 'react'
import './Nav.scss';

//@Persist
//@compute
interface Props {
  isLoggedIn: boolean;
  handleLoginButton: () => void;
}
export const Nav: React.FC<Props> = ({ isLoggedIn, handleLoginButton }: Props) => {


  let activeUser: any;



  if (isLoggedIn){
    activeUser=(<li><a onClick={() => handleLoginButton()}>Logout</a></li>)
  } else {
    activeUser=(<li><a onClick={() => handleLoginButton()}>Login</a></li>)
  }

  return (
<div className="header">
  <a href="/" className="logo">logo.</a>
  <input className="menu-btn" type="checkbox" id="menu-btn" />
  <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
  <ul className="menu">
    <li><a href="/services">Services</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
    {activeUser}
  </ul>
</div>
  )
}
