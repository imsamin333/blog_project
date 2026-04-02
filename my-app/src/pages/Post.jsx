import React,{useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Container,Button } from '../components'
import service from '../appwrite/config'
import { useSelector } from 'react-redux'
import parse from "html-react-parser"

function Post() {

    const [posts, setPosts] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams();

    const userData = useSelector((state)=> state.auth.userData)
    const isAuthor = posts && userData ? userData.$id === posts.userid : false;

    useEffect(()=>{
        if(slug){
             service.getPost(slug).then(post=>{
            if(post){
                setPosts(post)
                // navigate("/")
            }else{
                navigate("/")
            }
         })
        }else{
            navigate("/")
        }
    },[slug, navigate])


    const deletePost = ()=>{
        service.deletePost(posts.$id).then(status=>{
            if(status){
                service.deleteFile(posts.featuredId)
                navigate("/")
            }
        })
    }

  return posts ? (
    <div>
        <Container>
            <div>
               <img src={posts.featuredId ? service.getFilePreview(posts.featuredId) : <h1>No image</h1>} 
                alt={posts.title}
                className="rounded-xl" />

            {isAuthor && (
            <div>
                <Link to={`/edit-post/${posts.$id}`}>
                <Button>
                    Edit
                </Button>
                </Link>

                <Button onClick={deletePost}>
                    Delete
                </Button>
            </div>
        )}
    </div>

        <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{posts.title}</h1>
        </div>

        <div className="browser-css">
            {parse(posts.content)}
        </div>

        </Container>
    </div> 
  ): null;
}

export default Post