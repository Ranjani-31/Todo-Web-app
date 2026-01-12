import {Routes, Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import ProtectedRoute from './feautres/ProtectedRoute'


import "./App.css"

function App() {
  

  return ( 
    <BrowserRouter>
    <Routes> 

      <Route  path="/" element = {<ProtectedRoute><Home /></ProtectedRoute>  }/>
      <Route  path="/login" element = {<Login /> }/>
      <Route  path="/signup" element = { <Signup /> }/>
      <Route  path="/profile" element = { <ProtectedRoute><Profile /></ProtectedRoute> }/>



    </Routes>
      
      
    </BrowserRouter> 
  )
}

export default App
