import express from 'express'

import { isDoctor, isLogged } from '../middlewares/auth.js'
import { createPrescription, deletePrescriptionById, editPrescriptionById, getAllPrescriptions, getMyPrescriptions } from '../controllers/prescriptionController.js'
const router = express.Router()

router.get('/',  getAllPrescriptions)
router.get('/getmy',isLogged,  getMyPrescriptions)
router.post('/',isLogged, createPrescription)
router.patch('/:id',isLogged,isDoctor, editPrescriptionById)
router.delete('/:id',isLogged, deletePrescriptionById) 

export default router