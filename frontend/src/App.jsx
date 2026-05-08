import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import New from './New'
import MyTales from './MyTales'
import Navbar from './Navbar'

export default function App() {
  return (
    <>
      < Navbar/>
      <Routes>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/new' element = {<New/>}/>
        <Route path = '/mytales' element = {<MyTales/>}/>
        <Route path='/' element={<h1>Hello</h1>} />
      </Routes>
    </>
  )
}
