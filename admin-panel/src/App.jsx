import { useState } from 'react'
import '../src/App.css';
import AdminPanel from '../src/Pages/adminpanel.jsx';
import StudentPanel from '../src/Pages/studentpanel.jsx';
import Landingpage from '../src/Pages/Landingpage.jsx';
import PreloginPage from './Pages/PreloginPage.jsx';
import AdminLogPage from './Pages/AdminLogPage.jsx';
import StudentLogPage from './Pages/StudentLogPage.jsx';
import ConnectWallet from './Pages/ConnectWallet.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/prelogin' element={<PreloginPage />} />
        <Route path="/adminlogin" element={<AdminLogPage />} />
        <Route path='/studentlogin' element={<StudentLogPage />} />
        <Route path='/connect' element={<ConnectWallet />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/student" element={<StudentPanel />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
