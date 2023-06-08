import "./auth.css";
import avatar from "./profileimg.png";
import React, { useState } from "react";
//import { styled } from "@mui/material/styles";
//import Button from "@mui/material/Button";
//import Stack from "@mui/material/Stack";
import { Link, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister ,authMessage } from "../Redux/Auth/action";
export const LoginComp = () => {
  const { user, loading, errormessage } = useSelector((store) => store.user);
  const [regData, setRegData] = useState({
   // email: "albert@gmail.com",
   username:'user',
    password: "albert",
  });
  const islogin=true
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleSubmit = () => {
    const url = "http://localhost:5000/api/tokens";


    if (regData.displayName ==='' || 

  
  regData.password === '' ||  regData.username === '') {

  dispatch(authMessage('all Fields is requeired'))


return


}




    dispatch(authRegister(url, regData ,islogin));
  };
  if (user._id) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="auth-cont">
      <div>
        <h2 className="auth-heading">Welcome back!</h2>

        <div className="details-cont">
          <p>
          username

          </p>
          <input
       
          name="username"
           
           onChange={handleChange} className="inputcom" />

          <p>Password</p>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="inputcom"
          />

          {loading ? (
           

            <button
            
            onClick={handleSubmit}
            type="button" class="btn btn-primary">

              <CircularProgress style={{ color: "white" }} />

              </button>
           
          ) : (
            <button
            
            onClick={handleSubmit}
            type="button" class="btn btn-primary">Continue</button>
           
          )}

{/* ----error message--- */}
{errormessage} 


          <p className="auth-link" onClick={handleSubmit}>
            Don't have an account? Click continue to login as guest
          </p>
          <p className="contract">
            Need an account ?
            <Link className="auth-link" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
