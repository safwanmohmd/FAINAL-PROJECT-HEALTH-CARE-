import express from 'express'

import { isLogged } from '../middlewares/auth.js'
import { createPayment, editPaymentById, getAllPayments } from '../controllers/paymentController.js'
const router = express.Router()

router.get('/',isLogged,  getAllPayments)
router.post('/',isLogged, createPayment)
router.patch('/:id', editPaymentById)
// router.delete('/:id', deleteAppointmentById)

export default router