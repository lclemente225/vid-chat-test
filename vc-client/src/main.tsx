import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RoomProvider } from './context/RoomContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Home  from './pages/home/Home.tsx'
import Room from './pages/room/Room.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/room/:id" element={<Room/>}/>
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
