import express from 'express'

import { isAdmin, isLogged } from '../middlewares/auth.js'
import { createPayment, editPaymentById, getAllPayments, getMyPayments } from '../controllers/paymentController.js'
const router = express.Router()

router.get('/',isLogged,  getAllPayments)
router.get('/getmy',isLogged,  getMyPayments)
router.post('/',isLogged, createPayment)
router.patch('/:id',isLogged, editPaymentById)
// router.delete('/:id', deleteAppointmentById)

export default router