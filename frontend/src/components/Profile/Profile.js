import React from 'react'

const Profile = () => {
    const userId = localStorage.getItem('userId');
  return (
    <div>
        <h1>Profile {userId}</h1>
    </div>
  )
}

export default Profile