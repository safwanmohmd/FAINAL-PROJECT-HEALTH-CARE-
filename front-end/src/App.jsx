import React from 'react'
import { Routes,Route } from 'react-router-dom'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import Login from './pages/common/Login'
import IsLogged from './protectedRoutes/isLogged'
import Register from './pages/common/Register'
import Home from './pages/common/Home'
import BookAppointment from './pages/patient/BookAppointment'
import DrAppointments from './pages/doctor/DrAppointments'
import UserManagement from './pages/Admin/UserManagement'
import Prescriptions from './pages/Doctor/Prescriptions'
import BookList from './pages/BookList'
import AddBook from './pages/AddBook'
import Cart from './pages/Cart'
import PatientDashboard from './pages/Patient/PatientDashboard'
import PatientPrescriptions from './pages/Patient/PatientPrescriptions'




const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={ <IsLogged> <DoctorDashboard/></IsLogged> } />
        <Route path='/book' element={<IsLogged><BookAppointment/></IsLogged>  } />
        <Route path='/appointments' element={ <IsLogged ><DrAppointments/></IsLogged> } />
        <Route path='/ucp' element={<IsLogged > <UserManagement/> </IsLogged>} />
        <Route path='/presc' element={<IsLogged > <Prescriptions/> </IsLogged>} />
        <Route path='/patient' element={<IsLogged > <PatientDashboard/> </IsLogged>} />
        <Route path='/patient/presc' element={<IsLogged > <PatientPrescriptions/> </IsLogged>} />
       
        <Route path='/cart' element={ <Cart/> } />
        <Route path='/books' element={ <BookList/> } />
        <Route path='/addbook' element={ <AddBook/> } />
        <Route path='/' element={ <Home/> } />
        <Route path='/login' element={ <Login/>} />
        <Route path='/register' element={ <Register/>} />
      </Routes>
    </div>
  )
}

export default App