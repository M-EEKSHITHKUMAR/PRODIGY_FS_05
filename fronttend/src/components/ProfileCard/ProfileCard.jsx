import React from 'react'
import './ProfileCard.css'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const ProfileCard = ({location}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
    const posts=useSelector((state)=>state.postReducer.posts);
    const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="ProfileCard">
        <div className='ProfileImages'>
            <img src={user.coverPicture?serverPublic+user.coverPicture:serverPublic+"defaultCover.png"} alt="" />
            <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defaultProfile.png"} alt="" />

        </div>
        <div className='ProfileName'>
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt?user.workAt:"Write something"}</span>
        </div>
        <div className='followStatus'>
            <hr />
            <div>
                <div className='follow'>
               <span>{user.following.length}</span>
               <span>Following</span>
            </div>
            <div className='vl'></div>
            <div className="follow">
                <span>{user.followers.length}</span>
                <span>Followers</span>
            </div>
            {location==='profilepage' && (
              <>
              <div className='vl'></div>
              <div className="follow">
                <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                <span>Posts</span>
              </div>
              </>
            )}
            </div>
            <hr/>
        </div>
        {location==='profilepage' ?"":<span>
          <Link style={{textDecoration:"none",color:"#4CB256"}} to={`/profile/${user._id}`}>My Profile</Link>
          </span>}
    </div>
  )
}

export default ProfileCard