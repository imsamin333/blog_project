import React,{forwardRef, useId} from 'react'


const  Input = forwardRef(function Input({
    label,
    type= "text",
    className = "",
    ...props
},ref){
    const id= useId()
  return (
    <div className='w-full'>
        {label && <label className = "inline-block mb-1 pl-1"
        htmlFor = {id}> 
           {label} </label>}
        
        <input type={type} id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none w-full ${className}`}
        {...props}
        ref={ref}
         />
    </div>
  )
})

export default Input
