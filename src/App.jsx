import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { AuthContextProvider } from './context/AuthContext'
import Events from './Pages/Events'
import Challengs from './Pages/Challengs'
import Teams from './Pages/Teams'
import NewChallenge from './Pages/NewChallenge'
import EditComponents from './components/EditComponents'
import NewEvents from './Pages/NewEvents'
import EditEvents from './components/EditEvents'
import EventDetails from './Pages/EventDetails'
import NewTeams from './Pages/NewTeams'


function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthContextProvider>
      <Routes> {/* envuelve todas las rutas  */}
        {/**las rutas se deben de crear en forma jerarquica el path define la ruta "/" con element llamamos el componente */}
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/events/newevent' element={<NewEvents/>}/>
        <Route path='/events/details/:id' element={<EventDetails/>}/>
        <Route path='/events/:id' element={<EditEvents/>}/>
        <Route path='/challenges' element={<Challengs/>}/>
        <Route path='/challenges/newchallenge' element={<NewChallenge/>}/>
        <Route path='/challenges/:id' element={<EditComponents/>}/>
        <Route path='/teams' element={<Teams/>}/>
        <Route path='/teams/newteams' element={<NewTeams/>}/>
      </Routes>
    </AuthContextProvider>
  )
}

export default App
