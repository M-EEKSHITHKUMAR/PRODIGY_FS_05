import React from 'react'
import './Auth.css'
import Logo from "../../img/logo.png";
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';
const Auth = () => {

  const [isSignUp,setIsSignUp]=useState(false);
  const dispatch=useDispatch();
  const loading=useSelector((state)=>state.authReducer.loading);
  const [data,setData]=useState({firstname:"",lastname:"",password:"",confirmpass:"",username:""  });
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const [confirmPass,setConfirmPass]=useState(true);
  const handleSubmit=(e)=>{
    setConfirmPass(true);
    e.preventDefault();
    if(isSignUp){
      data.password===data.confirmpass?dispatch(signUp(data)):setConfirmPass(false);
      }else{
        dispatch(logIn(data));
      }
    };
  
  const resetForm=()=>{
    setConfirmPass(true);
    setData({firstname:"",lastname:"",password:"",confirmpass:"",username:""});
  }
  return (
   <div className="Auth">
    {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h2>Welcome</h2>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
    {/* Right Side */}
      <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{isSignUp?"Sign Up":"Log In"} </h3>

        {isSignUp && (
          <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}
          />
        </div>
        )}

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
             onChange={handleChange}
             value={data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
             onChange={handleChange}
             value={data.password}
          />
          {isSignUp && (
            <input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
             onChange={handleChange}
             value={data.confirmpass}
          />
        
          )}
          </div>
          <span style={{display:confirmPass?"none":"block",color:'red',fontSize:'12px',alignSelf:"flex-end",marginRight:"5px"}}>
            *Confirm Pasword is not same
          </span>

        <div>
            <span style={{fontSize: '12px',cursor:"pointer"}} onClick={()=>{setIsSignUp((prev)=>!prev);resetForm()}}>{isSignUp?"Already have an account. Login!":"Don't have an account. SignUp!"}</span>
        </div>
        <button className="button infoButton" type="submit" disabled={loading}>{loading?"Loading..." : isSignUp?"SignUp":"LogIn"} </button>
      </form>
    </div>
    </div>
  )
}



export default Auth