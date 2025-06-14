import axios from 'axios';
const API=axios.create({baseURL:"http://localhost:8000"})
export const getTimelinePosts=(id)=>API.get(`/post/${id}/timeline`);
export const likePost=(id,userId)=>API.put(`/post/${id}/like`,{userId:userId});

export const getComments = (postId) => API.get(`/comments/post/${postId}`);

// Create a new comment
export const createComment = (data) => API.post('/comments', data);