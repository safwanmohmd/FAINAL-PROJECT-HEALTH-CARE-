import React from 'react'
import { Routes,Route } from 'react-router-dom'
import DoctorDashboard from './pages/DoctorDashboard'
import Login from './pages/Login'
import IsLogged from './protectedRoutes/isLogged'
import Register from './pages/Register'
import Home from './pages/Home'
import BookAppointment from './pages/BookAppointment'
import DrAppointments from './pages/DrAppointments'
import UserManagement from './pages/UserManagement'




const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={ <IsLogged> <DoctorDashboard/></IsLogged> } />
        <Route path='/book' element={<IsLogged><BookAppointment/></IsLogged>  } />
        <Route path='/appointments' element={ <IsLogged ><DrAppointments/></IsLogged> } />
        <Route path='/ucp' element={<IsLogged > <UserManagement/> </IsLogged>} />
       
        <Route path='/' element={ <Home/> } />
        <Route path='/login' element={ <Login/>} />
        <Route path='/register' element={ <Register/>} />
      </Routes>
    </div>
  )
}

export default App