import React, { useEffect } from 'react'
import './Posts.css'
import { PostsData } from '../../data/PostsData'
import { useDispatch,useSelector } from 'react-redux'
import Post from '../Post/Post.jsx'
import { getTimelinePosts } from '../../actions/PostAction.js'
const Posts = () => {
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.authReducer.authData);
  const {posts,loading}=useSelector((state)=>state.postReducer);
  useEffect(()=>{
   dispatch(getTimelinePosts(user._id))
  },[])
  return (
    <div className="Posts">
        {loading?"Fetching Posts...":
        posts.map((post, id)=>{
            return <Post data={post} id={id} />
        })}
    </div>
  )
}

export default Posts