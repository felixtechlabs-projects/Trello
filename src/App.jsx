import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GetStarted from './components/GetStarted'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Tasks from './components/Tasks'
import CreateTask from './components/CreateTask'
function App() {
  

  return (
    <>
      <Router>

        <Routes>
          <Route path='/' element={<GetStarted />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='create-task' element={<CreateTask />} />
        </Routes>

      </Router>
    </>
  )
}

export default App
