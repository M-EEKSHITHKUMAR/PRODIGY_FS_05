import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
import { Followers } from '../../data/FollowersData.js';
import User from '../user/User.jsx';
import { useSelector } from 'react-redux';
import {  getAllUsers } from '../../api/UserRequest.js';
const FollowersCard = () => {
    const [persons,setPersons]=useState([]);
    const {user}=useSelector((state)=>state.authReducer.authData);

    useEffect(()=>{
        const fetchPersons=async()=>{
            const {data}= await getAllUsers();
            setPersons(data);
            console.log(data);
        };
        fetchPersons();
    },[]);
    
    
  return (
    <div className='FollowersCard'>
        <h3>People you may know</h3>
        {persons.map((person,id)=>{
            if(person._id!==user._id){
            return(
                <User person={person} key={id} />
        )}})}

    </div>
  )
}

export default FollowersCard