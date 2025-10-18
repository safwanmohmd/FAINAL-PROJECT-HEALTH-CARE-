import React from 'react'
import { Routes,Route } from 'react-router-dom'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import Login from './pages/common/Login'
import IsLogged from './protectedRoutes/IsLogged'
import Register from './pages/common/Register'
import Home from './pages/common/Home'
import BookAppointment from './pages/Patient/BookAppointment'
import DrAppointments from './pages/doctor/DrAppointments.jsx'
import UserManagement from './pages/Admin/UserManagement'
import DoctorPrescriptions from "./pages/Doctor/DoctorPrescriptions"
import PatientDashboard from './pages/Patient/PatientDashboard'
import PatientAppmnt from './pages/Patient/PatientAppmnt'
import PatientPrescriptions from './pages/Patient/PatientPrescriptions'
import AppointmentManagement from './pages/Admin/AppointmentManagement'
import PaymentSuccess from './pages/common/Payment-Success'
import PaymentFailed from './pages/common/Payment-Failed'
import AdminPrescriptions from './pages/Admin/AdminPrescriptions'
import AdminSpcl from './pages/Admin/AdminSpcl'
import Payments from './pages/Patient/Payments'
import IsDoctor from './protectedRoutes/IsDoctor'
import IsAdmin from './protectedRoutes/IsAdmin'
import ChatBot from './componants/common/ChatBot'




const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/chat' element={<ChatBot/>} />
       
        <Route path='/bookappointment' element={<IsLogged><BookAppointment/></IsLogged>  } />
        <Route path='/' element={ <Home/> } />
        <Route path='/login' element={ <Login/>} />
        <Route path='/register' element={ <Register/>} />

        <Route path='/doctor/dashboard' element={ <IsLogged><IsDoctor> <DoctorDashboard/></IsDoctor> </IsLogged> } />
        <Route path='/doctor/prescriptions' element={<IsLogged >  <DoctorPrescriptions/> </IsLogged>} />
        <Route path='/doctor/appointments' element={ <IsLogged ><IsDoctor><DrAppointments/></IsDoctor> </IsLogged> } />


        <Route path='/admin/dashboard' element={ <IsLogged> <IsAdmin><DoctorDashboard/></IsAdmin> </IsLogged> } />
        <Route path='/admin/ucp' element={<IsLogged > <IsAdmin><UserManagement/> </IsAdmin> </IsLogged>} />
        <Route path='/admin/appointment' element={<IsLogged > <IsAdmin><AppointmentManagement/> </IsAdmin>  </IsLogged>} />
        <Route path='/admin/prescriptions' element={<IsLogged ><IsAdmin> <AdminPrescriptions /> </IsAdmin> </IsLogged>} />
        <Route path='/admin/specialization' element={<IsLogged ><IsAdmin><AdminSpcl /> </IsAdmin>  </IsLogged>} />


        <Route path='/patient/dashboard' element={<IsLogged > <PatientDashboard/> </IsLogged>} />
        <Route path='/patient/appointments' element={<IsLogged > <PatientAppmnt/> </IsLogged>} />
        <Route path='/patient/prescriptions' element={<IsLogged > <PatientPrescriptions/> </IsLogged>} />
        <Route path='/patient/payments' element={<IsLogged > <Payments/> </IsLogged>} />

        
        <Route path='/payment-success' element={<IsLogged ><PaymentSuccess/></IsLogged> } />
        <Route path='/payment-failed' element={<IsLogged ><PaymentFailed/> </IsLogged> } />
       
        {/* <Route path='/cart' element={ <Cart/> } />
        <Route path='/books' element={ <BookList/> } />
        <Route path='/addbook' element={ <AddBook/> } /> */}


      </Routes>
    </div>
  )
}

export default App