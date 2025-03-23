import { useState } from 'react'
import AdminPanel from './adminpanel.jsx';
import StudentPanel from './studentpanel.jsx';
import Landingpage from './Landingpage.jsx';
import AdminLogPage from './AdminLogPage.jsx';
import StudentLogPage from './StudentLogPage.jsx';

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
