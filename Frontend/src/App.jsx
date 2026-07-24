import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import HomePage from './pages/HomePage'


const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
    </Routes>
  )
}

export default App