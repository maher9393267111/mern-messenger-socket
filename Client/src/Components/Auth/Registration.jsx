import "./auth.css";
import avatar from "./profileimg.png";
import React, { useEffect, useState } from "react";
//import { styled } from "@mui/material/styles";
//import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister, uploadPic , authMessage } from "../Redux/Auth/action";
import {useNavigate} from "react-router-dom"
export const RegisterComp = () => {
  const { user, loading, error ,errormessage } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    //pic
   profilePic : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
   // isAdmin: false,
    // name: "",
    // email: "",
    password: "",
    username:'',
    displayName:'',
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };
  const handleInputFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(uploadPic(reader.result));
      // setPic(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = () => {
    const url = "http://localhost:5000/api/Users";

if (regData.displayName ==='' || 
  // regData.email === ''
  
  // ||
  
  regData.password === '' || regData.username === '' || regData.username === '') {

  dispatch(authMessage('all Fields is requeired'))


return


}



    if (user.profilePic) regData["prpfilePic"] = user.profilePic;
    dispatch(authRegister(url, regData));

    navigate('/login')





  };
  if (user._id) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="auth-cont">
      <div>
        <h2 className="auth-heading">Create an account</h2>
        <div>
          <div className="profile-pic">
            <input onChange={handleInputFile} type="file" name="" id="file" />
            <label htmlFor="file" id="uploadBtn">
              <img id="photo" src={
                //user.pic ? user.pic : avatar
                user.profilePic ? user.pic : avatar
                
                } />
            </label>
          </div>
          <p className="profile-text">Choose Profile</p>
        </div>
        <div className="details-cont">
          {/* <p>Name</p>
          <input onChange={handleChange} name="name" className="inputcom" /> */}


          <p>username</p>
          <input onChange={handleChange} name="username" className="inputcom" />


          <p>displayName</p>
          <input onChange={handleChange} name="displayName" className="inputcom" />

{/* 
          <p>Email</p>
          <input onChange={handleChange} name="email" className="inputcom" /> */}

          <p>Password</p>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="inputcom"
          />

          <p>Confirm Password</p>
          <input type="password" className="inputcom" />

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

<div>
<span class="badge mt-1 text-bg-warning">{errormessage}</span>
</div>



          <Link className="auth-link" to={"/login"}>
            Already have an account
          </Link>
          <p className="contract">
            By registering you agree to Messenger's{" "}
            <span>Terms of Service</span> and <span>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
