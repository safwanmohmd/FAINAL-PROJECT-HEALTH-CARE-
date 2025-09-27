import express from 'express'

import { isLogged } from '../middlewares/auth.js'
import { createSpecialization, deleteSpecializationById, editSpecializationById, getAllSpecializations, getSpclById } from '../controllers/specialization.js'
const router = express.Router()

router.get('/',  getAllSpecializations)
router.post('/',isLogged, createSpecialization)
router.get('/:id' , getSpclById)
router.patch('/:id', editSpecializationById)
router.delete('/:id', deleteSpecializationById)

export default router