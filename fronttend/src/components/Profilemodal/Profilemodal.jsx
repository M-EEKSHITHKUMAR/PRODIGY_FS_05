import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({modalOpened, setModalOpened, data}) {
  const [opened, { open, close }] = useDisclosure(false);
  const {password,...other}=data;
  const [formData,setFormData]=useState(other);
  const [profileImage,setProfileImage]=useState(null);
  const [coverImage,setCoverImage]=useState(null);
  const dispatch=useDispatch();
  const param=useParams();
  const {user}=useSelector((state)=>state.authReducer.authData);
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})

  }
  const onImageChange=(event)=>{
    if(event.target.files && event.target.files[0]){
      let img=event.target.files[0];
      event.target.name==="profileImage"?setProfileImage(img):setCoverImage(img);
    }
  }
  const handleSubmit=(e)=>{
   e.preventDefault();
   let UserData=formData;
   if(profileImage){
    const data=new FormData();
    const filename=Date.now()+profileImage.name;
    data.append("name",filename);
    data.append("file",profileImage);
    UserData.profilePicture=filename;
    try {
      dispatch(uploadImage(data));
    } catch (error) {
      console.log(error);
    }
   }
   if(coverImage){
    const data=new FormData();
    const filename=Date.now()+coverImage.name;
    data.append("name",filename);
    data.append("file",coverImage);
    UserData.coverPicture=filename;
    try {
      dispatch(uploadImage(data));
    } catch (error) {
      console.log(error);
    }
   }
   dispatch(updateUser(param.id,UserData));
    setModalOpened(false);
  }
  return (
    <>
      <Modal
        
        
        title="Update Profile"
        size='55%'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
          
        }}
        opened = {modalOpened}
        onClose={() => setModalOpened(false)}

      >
        <form action="" className="infoForm">
            <h3>Your Info</h3>
            <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
             onChange={handleChange}
             value={formData.lastname }
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
             onChange={handleChange}
             value={formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
             onChange={handleChange}
             value={formData.livesin}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
             onChange={handleChange}
             value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name='relationship'
             onChange={handleChange}
             value={formData.relationship}
          />
        </div>


        <div>
            Profile Image 
            <input type="file"  name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input type="file"  name="coverImage" onChange={onImageChange}/>
        </div>

        <button className="button infoButton" onClick={handleSubmit} >Update</button>
        </form>
      </Modal>

      
    </>
  );
}

export default ProfileModal;