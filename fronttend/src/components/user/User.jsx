import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { followuser, Unfollowuser } from '../../actions/UserAction';
const User = ({person}) => {
   const {user} =useSelector((state) => state.authReducer.authData);
   const [following, setFollowing]=useState(person.followers.includes(user._id));

     const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
      const dispatch = useDispatch();
const handleFollow = () => {
        following?
         dispatch(Unfollowuser(person._id,user)):
        dispatch(followuser(person._id,user));
        setFollowing((prev)=>!prev);
    }
  return (
    <div className='follower'>
                    <div>
                        <img src={  person.profilePicture? publicFolder + person.profilePicture: publicFolder + "defaultProfile.png"} alt="" className='followerImage'/>
                        <div className="name">
                            <span>{person.firstname}</span>
                            <span>{person.username}</span>
                        </div>
                    </div>
                    <button className={following?"button fc-button unfollowButton":'button fc-button'} onClick={handleFollow}>
                        {following ? "Unfollow" : "Follow"}
                    </button> 
                </div>
            
  );
};

export default User