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
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig, rainbowKitConfig } from './config/rainbowKit'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider {...rainbowKitConfig}>
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

export default App
