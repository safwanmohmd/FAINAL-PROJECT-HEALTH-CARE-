import express from 'express'

import { isDoctor, isLogged } from '../middlewares/auth.js'
import { createPrescription, deletePrescriptionById, editPrescriptionById, getAllPrescriptions } from '../controllers/prescriptionController.js'
const router = express.Router()

router.get('/',isLogged,isDoctor,  getAllPrescriptions)
router.post('/',isLogged,isDoctor, createPrescription)
router.patch('/:id',isLogged,isDoctor, editPrescriptionById)
router.delete('/:id',isLogged, isDoctor, deletePrescriptionById)

export default router