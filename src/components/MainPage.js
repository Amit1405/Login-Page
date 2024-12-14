import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

const MainPage = () => {
  const navigate=useNavigate()
  const Login=()=>{
    navigate("/auth/Login")
  }
  return (
    <div className='App'>
      <button className='logout-btn' type='button' onClick={()=>Login()}>Login</button>
    </div>
  )
}

export default MainPage
