import React,{useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Button, Input, RTE} from "../index"
import {Select} from '../index'
import service from '../../appwrite/config'

function PostForm({post}) {

    const {register, handleSubmit, control, watch, setValue, getValues, } = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate();
    const userData = useSelector((state)=> state.auth.userData)

    const submit = async(data)=>{
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if(file){
                service.deleteFile(post.featuredId)
            }

            const dpPost = await service.updatePost(post.$id,{
                ...data,
                featuredId: file ? file.$id : post.featuredId
            })

            if(dpPost){
                navigate(`/post/${dpPost.$id}`)
            }
        }else{
            const file = await service.uploadFile(data.image[0])

            if(file){
                const fileId = file.$id
                // const featuredId = fileId
                const dbPost =  await service.createPost({
                    ...data,
                    featuredId: fileId,
                    userId : userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === "string"){
            return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]/g, "")   
            .replace(/\s+/g, "_")              
            .slice(0, 36)  
        }
        return "";
    },[])

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name === "title"){
                setValue("slug", slugTransform(value.title),{
                    shouldValidate: true
                })
            }
        })
        return ()=>{
            subscription.unsubscribe()
        }
    },[setValue, slugTransform, watch])
  return (
   <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div className='w-2/3 px-2'>
            <Input 
            label= "Title: "
            placeholder = "Title"
            className="mb-4"
            {...register("title", {required: true})} />

            
            <Input 
            label= "slug: "
            placeholder = "slug"
            className="mb-4"
            {...register("slug", {required: true})} 
            onInput= {(e)=>{
                setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
            }}/>

            <RTE label="content: " name="content" control={control} defaultValues={getValues("content")}/>

        </div>

        <div className='w-1/3 px-2'>
            <Input 
            label= "Featured Image: "
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {required: !post})}/>
        </div>
        {post && (
            <div className='w-full mb-4 '>
                <img src={service.getFilePreview(post.featuredId)} 
                alt={post.title}
                className="rounded-lg" />               
            </div>
        )}

        <Select 
        options = {["active", "inactive"]}
        label="Status"
        className="mb-4"
        {...register("status",{required:true})}
        />

        <button type="submit"  className="w-[99px] bg-white text-black mx-auto rounded-xl p-1 text-2xl border-2 border-black ">
            {post ? "Update" : "Submit"}
        </button>
   </form>
  )
}

export default PostForm