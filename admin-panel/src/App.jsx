import { useState } from 'react'
import '../src/App.css';
import AdminPanel from '../src/Pages/adminpanel.jsx';
import StudentPanel from '../src/Pages/studentpanel.jsx';
import Landingpage from '../src/Pages/Landingpage.jsx';
import AdminLogPage from '../src/Pages/AdminLogPage.jsx';
import StudentLogPage from '../src/Pages/StudentLogPage.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/student" element={<StudentPanel />} />
        <Route path="/login" element={<AdminLogPage />} />
        <Route path="/adminlogin" element={<StudentLogPage />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
