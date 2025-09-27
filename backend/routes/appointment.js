import express from 'express'

import { isAdmin, isLogged } from '../middlewares/auth.js'
import { createAppointment, deleteAppointmentById, editAppointmentById, getAllAppointments } from '../controllers/appmntController.js'
const router = express.Router()

router.get('/',isLogged,  getAllAppointments)
router.post('/',isLogged, createAppointment)
router.patch('/:id',isAdmin, editAppointmentById)
router.delete('/:id',isAdmin, deleteAppointmentById)

export default router