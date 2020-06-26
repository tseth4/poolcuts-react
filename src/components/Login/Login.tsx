import React, { useState } from 'react'
import './Login.scss';
export default function Login() {
  
  const [value, setValue] = useState({
    username: ''
  });

  return (
    <div className="login-container"> 
      <div className="login-inner">
        <h1>Login: </h1>
        <form>
        <input className="login-username"></input>

        </form>
      </div>
    </div>
  )
} 
