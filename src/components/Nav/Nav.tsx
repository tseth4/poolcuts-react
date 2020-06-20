import React from 'react'
import './Nav.scss';

interface Props {
  isLoggedIn: boolean;
  handleLoginButton: () => void;
}
export const Nav: React.FC<Props> = () => {

  // const { isLoggedIn, handleLoginButton } = props;

  // let activeUser: any;

  // console.log(isLoggedIn);

  // if (isLoggedIn){
  //   activeUser=(<div onClick={() => handleLoginButton()}>Logout</div>)
  // } else {
  //   activeUser=(<div onClick={handleLoginButton()}>Login</div>)
  // }

  return (
    <div className="nav-container">
      <div>logo</div>
      {/* {activeUser} */}
      <div>Home</div>
      <div>Services</div>
    </div>
  )
}
