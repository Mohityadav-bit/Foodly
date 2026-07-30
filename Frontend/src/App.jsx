import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import HomePage from './pages/HomePage'
import Loader from './components/Loader';
import ForgotPassword from './pages/ForgotPassword'

export const serverUrl = "http://localhost:8000"


const App = () => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2500); // ⏱ duration of loader

  //   return () => clearTimeout(timer);
  // }, []);

  // // 👇 SHOW LOADER FIRST
  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div>

    
    <Toaster/>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>

    </div>
  )
}

export default App