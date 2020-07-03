import React, { useState } from 'react'
import './Login.scss';

export default function Login() {
  
  const [value, setValue] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (input: string) => (event:any) => {
    setValue({...value, [input]: event.target.value});
  }

  return (
    <div className="login-container"> 
      <div className="login-inner">
        <form className="form-container">
          <h1>Login</h1>
          <div className="form-container__textbox">
            <input type="text" id="uname" placeholder="Username" className="form-container__inptpswd" onChange={handleInputChange('password')}/>
          </div>
          <div className="form-container__textbox">
            <input value={value.password} type="text" id="pword" placeholder="Password" className="form-container__inptpswd" onChange={handleInputChange('password')}/>
          </div>
          <input type="submit" value="Login" className="form-container__logbtn"/>
        </form>
      </div>
    </div>
  )
} 
