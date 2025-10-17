import express from 'express'

import { isAdmin, isDoctor, isLogged } from '../middlewares/auth.js'
import { createAppointment, deleteAppointmentById, editAppointmentById, getAllAppointments, getDocAppointments, getMyAppointments } from '../controllers/appmntController.js'
const router = express.Router()

router.get('/',isLogged, isDoctor, getAllAppointments)
router.get('/getmy',isLogged,  getMyAppointments)
router.get('/getdoc',isLogged, isDoctor, getDocAppointments)
router.post('/',isLogged, createAppointment)
router.patch('/:id',isLogged, editAppointmentById)
router.delete('/:id',isLogged,isDoctor, deleteAppointmentById)

export default router