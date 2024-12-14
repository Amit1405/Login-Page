import React from 'react'
import "../App.css"
import ProfileImage from '../ProfileImage.png'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../utills/AuthContext'

const ProfileCard=() => {
    const {setIsLoggedIn}=useAuth();
    const navigate=useNavigate()
    const userLogout=()=>{
        localStorage.removeItem("access-token");
        localStorage.removeItem("userdata");
        setIsLoggedIn(false);
        navigate("/auth/login");
    }
    return (
        <div class="profile">
            <div class="profile-image">
                <img src={ProfileImage} />
            </div>
            <h2 class="profile-username">Elena Zoldado</h2>
            <small class="profile-user-email">example@gmail.com</small>
            <small class="profile-user-gander">Female</small>
                <button type="button" class="logout-btn" onClick={()=>userLogout()}>Logout</button>
        </div>
    )
}

export default ProfileCard
