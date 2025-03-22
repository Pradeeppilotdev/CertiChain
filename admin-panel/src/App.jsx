import { useState } from 'react'
import AdminPanel from './adminpanel.jsx';
import StudentPanel from './studentpanel.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/student" element={<StudentPanel />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
