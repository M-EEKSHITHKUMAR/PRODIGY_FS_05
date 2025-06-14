import React from 'react'
import './ProfileSide.css'
import Logosearch from '../LogoSearch/Logosearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import FollowersCard from '../FollowersCard/FollowersCard'

const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
      <Logosearch/>
      <ProfileCard location="homepage"/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileSide