import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import HomePage from './pages/HomePage'
import Loader from './components/Loader';
import { useState, useEffect } from 'react'

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
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
  )
}

export default App