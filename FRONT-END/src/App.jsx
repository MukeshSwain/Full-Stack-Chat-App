import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App() {
  const { authUser,checkAuth,isCheckingAuth,onlineUsers } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  console.log("onlineWale : ",onlineUsers)
  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='animate-spin size-10'/>
    </div>
  )
    

  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={authUser ? <Home /> :<Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser?<SignUp />:<Navigate to="/"/>} />
        <Route path="/login" element={!authUser?<Login />:<Navigate to="/"/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser?<Profile />:<Navigate to="/login"/>} />
      </Routes>
      <Toaster position='top-center'/>
    </div>
  );
}

export default App
