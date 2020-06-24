import React, { useState } from 'react'
import './Nav.scss';

//@Persist
//@compute
interface Props {
  isLoggedIn: boolean;
  handleLoginButton: () => void;
}
export const Nav: React.FC<Props> = ({ isLoggedIn, handleLoginButton }: Props) => {

  const [active, setActive] = useState(false);

  let activeUser: any;
  let navLinks;


  if (isLoggedIn){
    activeUser=(<div className="nav__item" onClick={() => handleLoginButton()}>Logout</div>)
  } else {
    activeUser=(<div className="nav__item" onClick={() => handleLoginButton()}>Login</div>)
  }

  return (
    <div className="nav" id="my-top-nav">
      <div className="nav__logo">logo</div>
      <div className="nav__item">Home</div>
      <div className="nav__item">Services</div>
      {activeUser}
      <div className="nav__ham-container">
        <div onClick={() => setActive(!active)} className="nav__hamburger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>

    </div>
  )
}
