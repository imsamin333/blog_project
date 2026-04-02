import React from 'react'
import {useDispatch} from "react-redux"
import { logOut } from '../../store/authSlice'
import authService from '../../appwrite/auth'

function LogOutButton() {

    const dispatch = useDispatch();
    const logOutHandler = ()=>{ 
        authService.logOut().then(()=>{
        dispatch(logOut())})
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 
    hover:bg-blue-100 rounded-full'
    onClick={logOutHandler}>Log Out</button>
  )
}

export default LogOutButton