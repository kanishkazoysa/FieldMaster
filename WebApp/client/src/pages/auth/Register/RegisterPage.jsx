import React from "react";
import "./RegisterStyle.css";
import logo from "../../../images/logo.png";

function RegisterPage() {
  return (
    <div className="Registercontainer">
      <div className="left">
        <img src={logo} alt="Company Logo" className="logo" />
       
        <div className="formdiv">
        <h4 style={{alignContent:"center", textAlign:"center"}}>Sign Up</h4>
        <p style={{alignContent:"center", textAlign:"center"}}>Welcome, please enter your details</p>
          <div className="form-group">
            <div className="formLabel">
              <label>Email address</label>
            </div>

            <input type="email" className="input-type" placeholder="Enter your email"/>
          </div>
          <div className="form-group">
            <div className="formLabel">
              <label>Password</label>
            </div>

            <input type="password" className="input-type" placeholder="Enter your password"/>
          </div>
          <div className="form-group">
            <div className="formLabel">
              <label>Confirm Password</label>
            </div>

            <input type="password" className="input-type" placeholder="Confirm your password"/>
          </div>
          <button className="btn">Sign Up</button>
          <div className="bottom">
            <center>
            <p>Already have an account?<b>Sign in</b></p>
            </center>
           <div className="terms">
           <p >By signing up you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b></p>
           </div>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default RegisterPage;
