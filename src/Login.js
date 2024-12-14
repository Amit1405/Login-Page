import React,{useEffect,useState} from 'react'
import LoginImage from '../src/LoginImage.png'
import {Formik} from "formik";
import * as Yup from "yup";
import {NavLink,useNavigate} from "react-router-dom";
import axios from "axios";
import UserImage from "./form-icons/account_circle.png"
import Email from "./form-icons/mail_icon.png"
import Password from "./form-icons/key_icon.png"
import Eye from "./form-icons/visibility.png"
import EyeOff from "./form-icons/eye-off.png"
import Google from "./form-icons/google.png"
import Facebook from "./form-icons/facebook.png"
import {useAuth} from './utills/AuthContext';
const schema=Yup.object().shape({
  username: Yup.string()
    .oneOf(['emilys'],'Invalid username')
    .required("Required"),
  email: Yup.string()
    .required("Required")
    .email("Invalid email"),
  password: Yup.string()
    .min(8,'Password must be at least 8 characters')
    .required('Required'),
});

const Login=() => {
  const navigate=useNavigate();
  const [showError,setShowError]=useState("")
  const [type,setType]=useState("text")
  const {setIsLoggedIn}=useAuth();
  const onPressLogin=async (values) => {
    const username=values.username;
    const password=values.password;
    const payload={
      "username": username,
      "password": password,
    }
    console.log({payload})
    console.log({values})
    try {
      const response=await fetch('https://dummyjson.com/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if(!response.ok) {
        throw new Error('Request failed with status code '+response.status);
      }

      const data=await response.json();
      console.log(data);
      localStorage.setItem('access-token',data?.data?.token);
      localStorage.setItem('userdata',JSON.stringify(data?.data));
      setIsLoggedIn(true)
      navigate("/home");
    } catch(error) {
      setShowError(error.message);
    }
  }
  const showPassword=() => {
    if(type==="password") {
      setType("text")
    } else {
      setType("password")
    }
  }
  useEffect(() => {
    console.log({showError})
  },[showError])
  return (
    <div className="container">
      <div className="left-panel">
        <img src={LoginImage} alt="Illustration" className="illustration" />
      </div>
      <div className="right-panel">
        <h2>Welcome to <br /><span>Unstop</span></h2>
        <div className="social-login">
          <button type="button" className="btn google"><img src={Google} className='google-icon' /> Login with Google</button>
          <button type="button" className="btn facebook"><img src={Facebook} className='fb-icon' /> Login with Facebook</button>
        </div>
        <div class="or-container"><p></p><span>OR</span></div>
        <div>
          <Formik
            validationSchema={schema}
            initialValues={{username: "",email: "",password: ""}}
            onSubmit={(values) => onPressLogin(values)}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div className="login">
                <div className="form">
                  {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                  <form noValidate onSubmit={handleSubmit}>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <div class="group">
                      <img src={UserImage} className='icon'/>
                      <div class="inputs-container">
                        <p>Username</p>
                        <input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          value={values.username}
                          //placeholder="User name"
                          //className="input"
                          id="username"
                        />
                      </div>
                    </div>
                    <p className="error">
                      {errors.username&&touched.username&&errors.username}
                    </p>
                    <div className="group">
                      <img src={Email} className='icon' />
                      <div className="inputs-container">
                        <p>Email</p>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          //placeholder="Email"
                          className="input"
                          id="email"
                        />
                      </div>
                    </div>
                    {/* If validation is not passed show errors */}
                    <p className="error">
                      {errors.email&&touched.email&&errors.email}
                    </p>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <div className="group">
                      <img src={Password} className='icon' />
                      <div className='inputs-container'>
                        <p>Password</p>
                        <input
                          type={type}
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          //placeholder="Password"
                          className="input"
                        />
                      </div>
                      <img src={type=="password"? EyeOff:Eye} className="eye_icon" onClick={() => showPassword()} />
                    </div>
                    {/* If validation is not passed show errors */}
                    <p className="error">
                      {errors.password&&touched.password&&errors.password}
                    </p>
                    <div className="options">
                      <label>
                        <input type="checkbox" /> Remember me</label>
                      <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn login">Login</button>
                    <p className="error">
                      {showError}
                    </p>
                    <p className='no-account'>Don't have an account? <span><a href="#">Register</a></span></p>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login
