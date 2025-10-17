import express from 'express'

import { isDoctor, isLogged } from '../middlewares/auth.js'
import { createPrescription, deletePrescriptionById, editPrescriptionById, getAllPrescriptions, getDocPrescriptions, getMyPrescriptions } from '../controllers/prescriptionController.js'
const router = express.Router()

router.get('/',isLogged,isDoctor,  getAllPrescriptions)
router.get('/getmy',isLogged,  getMyPrescriptions)
router.get('/getdoc',isLogged,isDoctor,  getDocPrescriptions)
router.post('/',isLogged,isDoctor, createPrescription)
router.patch('/:id',isLogged,isDoctor, editPrescriptionById)
router.delete('/:id',isLogged, deletePrescriptionById) 

export default router