import React, { useState, useEffect } from 'react';
import './Post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost, getComments, createComment } from '../../api/PostRequest';

const Post = ({ data = {} }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(data?.likes?.includes(user?._id) || false);
  const [likes, setLikes] = useState(data?.likes?.length || 0);

  // Fetch comments when comment section is opened
  useEffect(() => {
    if (openComment && data?._id) {
      const fetchComments = async () => {
        try {
          const { data: commentsData } = await getComments(data._id);
          setComments(commentsData || []);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      fetchComments();
    }
  }, [openComment, data?._id]);

  // Toggle comment section
  const handleComment = () => {
    setOpenComment((prev) => !prev);
  };

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !data?._id) return;

    try {
      const commentData = {
        userId: user?._id,
        postId: data._id,
        text: newComment,
      };
      const { data: newCommentData } = await createComment(commentData);
      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Handle like/unlike
  const handleLike = () => {
    if (!data?._id) return;
    setLiked((prev) => !prev);
    likePost(data._id, user?._id);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="Post">
      <img
        src={data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''}
        alt=""
      />
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" style={{cursor:"pointer"}} onClick={handleComment} />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>
      <div className="detail">
        <span><b>{data?.name || ''}</b></span>
        <span> {data?.desc || ''}</span>
      </div>

      {/* Comment Section */}
      {openComment && (
        <div className="commentSection" style={{ marginTop: '10px' }}>
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={{ padding: '5px', flex: 1 }}
            />
            <button className='button' type="submit" style={{ padding: '5px 10px' }}>
              Post
            </button>
          </form>
          <div className="comments" style={{ marginTop: '10px' }}>
            <p style={{fontWeight:'2px', fontSize:"28px" }}>Comments</p>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} style={{ margin: '5px 0' }}>
                  <span><b>{comment.userId?.username || 'User'}</b>: </span>
                  <span>{comment.text}</span>
                </div>
              ))
            ) : (
              <span>No comments yet</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;