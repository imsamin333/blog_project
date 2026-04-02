import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import {Button, Input, Logo} from "./index"
import { logIn } from '../store/authSlice'
import { useDispatch } from 'react-redux'

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit}  = useForm();
    const [error, setError] = useState("");

    const create = async(data)=>{
        setError("");
        try{
            const userData = await authService.createAccount(data)
            if(userData){
                const logInData = await authService.getCurrentUser()
                if(logInData){
                    dispatch(logIn(logInData))
                    navigate("/")
                }
            }

        }catch(err){
            setError(err);
            console.log("sing up err:",err)
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
                {/* <h2 className='text-center text-2xl font-bold'>Sign In </h2> */}
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className='mt-2 text-center text-black'>
                    Already have an Account ?
                    <Link to="/login" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        sign in
                    </Link>
                </p>
                {error && <p className='text-center text-red-600 mt-8'>{error.message}</p>}
    
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                        label="Full Name: "
                        placeholder="Enter your full Name"
                        type="text"
                        {...register("email",{
                            required: true
                        })}/>
    
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
                       <Button className="w-full" type="submit">
                            Create an Account
                       </Button>
                    </div>
                </form>
            </div>
        </div>

  )
}

export default SignUp