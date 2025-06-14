import React from 'react'
import './Logosearch.css'
import Logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'
const Logosearch = () => {
  return (
    <div className='Logosearch'>
        <img src={Logo} alt=''/>
        <div className='Search'>
            <input type='text' placeholder='#Explore'/>
            <div className='s-icon'>
                <UilSearch/>
            </div>
        </div>
        
    </div>
  )
}

export default Logosearch