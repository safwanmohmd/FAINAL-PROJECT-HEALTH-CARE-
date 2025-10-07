import React from 'react'
import { Routes,Route } from 'react-router-dom'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import Login from './pages/common/Login'
import IsLogged from './protectedRoutes/isLogged'
import Register from './pages/common/Register'
import Home from './pages/common/Home'
import BookAppointment from './pages/Patient/BookAppointment'
import DrAppointments from './pages/doctor/DrAppointments'
import UserManagement from './pages/Admin/UserManagement'
import DoctorPrescriptions from "./pages/Doctor/DoctorPrescriptions"
import BookList from './pages/BookList'
import AddBook from './pages/AddBook'
import Cart from './pages/Cart'
import PatientDashboard from './pages/Patient/PatientDashboard'
import PatientAppmnt from './pages/Patient/PatientAppmnt'
import PatientPrescriptions from './pages/Patient/PatientPrescriptions'
import AppointmentManagement from './pages/Admin/AppointmentManagement'
import PaymentSuccess from './pages/common/Payment-Success'
import PaymentFailed from './pages/common/Payment-Failed'
import AdminPrescriptions from './pages/Admin/AdminPrescriptions'
import AdminSpcl from './pages/Admin/AdminSpcl'
import Payments from './pages/Patient/Payments'




const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/doctor/dashboard' element={ <IsLogged> <DoctorDashboard/></IsLogged> } />
        <Route path='/admin/dashboard' element={ <IsLogged> <DoctorDashboard/></IsLogged> } />
        <Route path='/bookappointment' element={<IsLogged><BookAppointment/></IsLogged>  } />
        <Route path='/doctor/appointments' element={ <IsLogged ><DrAppointments/></IsLogged> } />
        <Route path='/admin/ucp' element={<IsLogged > <UserManagement/> </IsLogged>} />
        <Route path='/admin/appointment' element={<IsLogged > <AppointmentManagement/> </IsLogged>} />
        <Route path='/doctor/prescriptions' element={<IsLogged > <DoctorPrescriptions/> </IsLogged>} />
        <Route path='/admin/prescriptions' element={<IsLogged > <AdminPrescriptions /> </IsLogged>} />
        <Route path='/admin/specialization' element={<IsLogged > <AdminSpcl /> </IsLogged>} />
        <Route path='/patient/dashboard' element={<IsLogged > <PatientDashboard/> </IsLogged>} />
        <Route path='/patient/appointments' element={<IsLogged > <PatientAppmnt/> </IsLogged>} />
        <Route path='/patient/prescriptions' element={<IsLogged > <PatientPrescriptions/> </IsLogged>} />
        <Route path='/patient/payments' element={<IsLogged > <Payments/> </IsLogged>} />
        <Route path='/payment-success' element={<PaymentSuccess/>} />
        <Route path='/payment-failed' element={<PaymentFailed/>} />
       
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