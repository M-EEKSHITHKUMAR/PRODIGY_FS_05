import React, { useState, useRef } from 'react';
import './PostShare.css';
import ProfileImage from '../../img/profileImg.jpg';
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [showTagInput, setShowTagInput] = useState(false); // State for tag textbox visibility
  const [tagValue, setTagValue] = useState('@'); // State for tag textbox value
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const desc = useRef();
  const imageRef = useRef();
  const tagInputRef = useRef(); // Ref for tag input
  const { user } = useSelector((state) => state.authReducer.authData);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = '';
    setShowTagInput(false);
    setTagValue('@');
  };

  const handleTagClick = () => {
    setShowTagInput(true); // Show the tag input
    setTimeout(() => tagInputRef.current?.focus(), 0); // Focus the input after render
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    // Ensure the value starts with '@'
    if (value.startsWith('@')) {
      setTagValue(value);
    } else {
      setTagValue('@' + value.replace(/^@/, '')); // Force '@' at the start
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (showTagInput && tagValue !== '@') {
      newPost.tags = tagValue; // Add tags to the post if present
    }
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append('name', filename);
      data.append('file', image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="PostShare">
      <img
        src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png'}
        alt=""
        style={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)' }}
      />
      <div>
        <input ref={desc} required type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div className="option" style={{ color: 'var(--photo)' }} onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: 'var(--video)' }} onClick={() => imageRef.current.click()}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: 'var(--location)' }} onClick={() => imageRef.current.click()}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: 'var(--shedule)' }} onClick={handleTagClick}>
            <UilSchedule />
            Tags
          </div>
          <button className="button ps-button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Uploading...' : 'Share'}
          </button>
          <div style={{ display: 'none' }}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {showTagInput && (
          <div className="tagInput">
            <input
              ref={tagInputRef}
              type="text"
              value={tagValue}
              onChange={handleTagChange}
              placeholder="@tag"
            />
            <UilTimes onClick={() => setShowTagInput(false)} />
          </div>
        )}
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;