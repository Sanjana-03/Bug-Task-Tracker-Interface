import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import DeveloperHome from './pages/DeveloperHome';
import ManagerHome from './pages/ManagerHome';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<UserLogin />}></Route>
        <Route path='/developer-dashboard' element={<DeveloperHome />}></Route>
        <Route path='/manager-dashboard' element={<ManagerHome />}></Route>
      </Routes>
    </div>
  )
}

export default App
