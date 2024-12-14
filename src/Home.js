import React from 'react'
import ProfileCard from './components/ProfileCard'
import './App.css';

const Home = () => {
  return (
    <div className='App'>
        <h3 className='welcome-message'>Welcome to <br/> <span>Unstop</span></h3>
        <ProfileCard/>
    </div>
  )
}

export default Home
