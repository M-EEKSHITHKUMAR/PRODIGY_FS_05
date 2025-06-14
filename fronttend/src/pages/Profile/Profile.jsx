import React from 'react'
import './Profile.css'
import Logosearch from '../../components/LogoSearch/Logosearch'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
const Profile = () => {
  return (
    <div className='Profile'>
        <ProfileLeft/>
        <div className="ProfileCenter">
          <ProfileCard location="profilepage"/>
          <PostSide/>
         
        </div>
         <RightSide/>
    </div>
  )
}

export default Profile