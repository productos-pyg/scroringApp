import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthContextProvider>
      <Routes> {/* envuelve todas las rutas  */}
        {/**las rutas se deben de crear en forma jerarquica el path define la ruta "/" con element llamamos el componente */}
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </AuthContextProvider>
   
  )
}

export default App
