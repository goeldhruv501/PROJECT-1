import React from 'react'
import { Home, Navbar, LogIn, SignIn, About, ContactUs, Admin, OTP } from './Components/AllComponents'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/LogIn' element={<LogIn />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/ContactUs' element={<ContactUs />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/OTP/:id' element={<OTP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App