import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import New from './New'
import MyTales from './MyTales'
import Navbar from './Navbar'
import Profile from './Profile'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Register'

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='/mytales'
          element={
            <ProtectedRoute>
              <MyTales />
            </ProtectedRoute>
          }
        />

        <Route path='/new' element={<New />} />
        <Route path = '/login' element = {<Login/>}/>
        <Route path = 'register' element = {<Register/>}/>

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}