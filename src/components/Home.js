import React from 'react'
import { useAuth } from '../hooks/AuthProvider';

const Home = () => {
  const { userData } = useAuth();

  return (
    <div className='home'>
    { userData && <p>Welcome, {userData.firstName}! </p>}
    <h1>DaCosta Verde</h1>
    <h2>Bringing you delicious highland cows from farm to plate.</h2>
    </div>
  )
}

export default Home