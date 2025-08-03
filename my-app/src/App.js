import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar'

import { MovieProvider } from './context/MovieContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/signup'
import Favorites from './pages/Favorites'



function App() {
  return (
    <div>
<MovieProvider>
  <NavBar/>
  <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/favorites' element={<Favorites/>} />
        </Routes>
      </main>
</MovieProvider>
      
    </div>
  )
}

export default App