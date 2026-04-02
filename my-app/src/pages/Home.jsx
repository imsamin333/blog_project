import React,{useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import service from '../appwrite/config'

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        service.getPosts().then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })
    },[])

    if(posts.length === 0){
        return(
            <div className='py-8 mt-4 text-center w-full'>
                <Container>
                    <div className=' flex flex-wrap'>
                        <div className='w-full p-2 text-2xl'>
                            <h1>log in to read post</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>{
                        return <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    })}

                </div>
            </Container>
        </div>
    )
}

export default Home