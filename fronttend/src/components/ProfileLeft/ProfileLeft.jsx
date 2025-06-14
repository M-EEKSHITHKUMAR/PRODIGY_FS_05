import React from 'react'
import './ProfileLeft.css'
import Logosearch from '../LogoSearch/Logosearch'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'

const ProfileLeft = () => {
  return (
    <div className='ProfileLeft'>
        <Logosearch/>
        <InfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft