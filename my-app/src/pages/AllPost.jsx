import React,{useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import service from '../appwrite/config';


function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        service.getPosts([]).then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })

    },[])
  return (
    <div className='w-full py-8'>
        <Container>
           <div className=' flex flex-wrap'>
                {posts.map((post)=>{
                    return <div key={post.$id} className='w-1/4 p-2'> 
                        <PostCard {...post}/>
                    </div>
                })}
           </div>
        </Container>
    </div>
  )
}

export default AllPost

