import React from 'react'
import {Container, Logo} from "../index"
import LogOutButton from './LogOutButton'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Header() {
  const authStatus = useSelector(state=> state.auth?.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name:"Home",
      url: "/",
      active:true
    },
    {
      name: "login",
      url: "/login",
      active: !authStatus
    },
    {
      name: "signup",
      url: "/signup",
      active: !authStatus
    },
    {
      name:"AllPosts" ,
      url: "/all-posts",
      active:authStatus
    },
    {
      name:"AddPosts" ,
      url:"/add-post" ,
      active:authStatus
    },
    
  ]

  return (
    <div className="py-3 shadow ">
      <Container>
        <nav className='flex w-full'> 
          <div className=' mr-4'>  
            <Link to="/">
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto gap-3.5'>
            {
              navItems.map((item)=> 
              item.active ? (
                <li key={item.name}>
                  <button onClick={()=>navigate(item.url)}
                    className='inline-block px-6 py-2 rounded-full duration-200 hover:bg-blue-100'>{item.name}</button>
                </li>
              ) : null)
            }
            {
              authStatus && (
              <li>
                <LogOutButton />
              </li>)
            }
          </ul>
        </nav>
      </Container>
    </div>
  )
}

export default Header