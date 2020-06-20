import React, {useState} from 'react';
import { Nav } from './Nav';
// import { profile } from 'console';

export default function NavContainer() {

  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  let isLoggedIn = true;

  const handleLoginButton: any = () => {
    isLoggedIn = !isLoggedIn;
    console.log("inisde handle login" + isLoggedIn)
    // setIsLoggedIn(!isLoggedIn);
  }

  let navProps = {
    isLoggedIn: isLoggedIn,
    handleLoginButton: handleLoginButton
  }

  return (
    <Nav {...navProps}/>
  )
}
