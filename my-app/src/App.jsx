import React,{ useState, useEffect} from 'react'
import {useDispatch} from "react-redux"
import { logIn, logOut } from './store/authSlice'
import authService from './appwrite/auth'
import { Footer, Header } from './components'
import { Outlet } from "react-router-dom";



function App() {
  const [loading, setLoadig] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(logIn(userData))
      }else{
        dispatch(logOut())
      }
    })
    .catch(err=> console.log("useEffect gerCurrentUser err:",err))
    .finally(()=> setLoadig(false))
  },[])
 
  return !loading ? (
    <div className='min-h-screen flex flex-wrap flex-col content-between '>
          <Header />
          <main>
           <Outlet />
          </main>
          <Footer />
    </div>
  ) : null
}

export default App
