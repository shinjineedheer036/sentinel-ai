import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import Requests from './pages/Requests'
import Threats from './pages/Threats'
import Admin from './pages/Admin'
import Analytics from './pages/Analytics'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="threats" element={<Threats />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
