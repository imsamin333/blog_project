import React,{useState} from 'react'
import {Button, Input, Logo} from "./index"
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logIn as authLogIn } from '../store/authSlice';
import {useForm} from "react-hook-form"

function LogIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const login = async(data)=>{
        console.log("login data",data)
        setError("");
        try{
        const session = await authService.logIn(data)
        if(session){
            const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogIn(userData))
                    navigate("/")
            }
        }
        }catch(err){
            console.log("err", err)
            setError(err.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl  p-10 border border-black'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo  width='100%'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold'>Sign In </h2>
            <p className='mt-2 text-center text-black'>
                Dont have an Account ?
                <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-center text-red-600 mt-8'>{error}</p>}

            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input 
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",{
                        required: true
                    })}/>

                    <Input 
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password",{
                        required: true
                    })}
                    />
                    <Button 
                    className="w-full"
                    type="submit"
                    children ="log in"/>
                    
                </div>
            </form>
        </div>
    </div>
  )
}

export default LogIn