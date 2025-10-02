import express from 'express'

import { isAdmin, isLogged } from '../middlewares/auth.js'
import { createAppointment, deleteAppointmentById, editAppointmentById, getAllAppointments, getMyAppointments } from '../controllers/appmntController.js'
const router = express.Router()

router.get('/',isLogged,  getAllAppointments)
router.get('/getmy',isLogged,  getMyAppointments)
router.post('/',isLogged, createAppointment)
router.patch('/:id', editAppointmentById)
router.delete('/:id',isLogged, deleteAppointmentById)

export default router