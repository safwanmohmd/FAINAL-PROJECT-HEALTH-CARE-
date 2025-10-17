import express from 'express'

import { isAdmin, isLogged } from '../middlewares/auth.js'
import { createSpecialization, deleteSpecializationById, editSpecializationById, getAllSpecializations, getSpclById } from '../controllers/specialization.js'
const router = express.Router()

router.get('/',  getAllSpecializations)
router.post('/',isLogged,isAdmin, createSpecialization)
router.get('/:id' ,isLogged,isAdmin, getSpclById)
router.patch('/:id',isLogged,isAdmin, editSpecializationById)
router.delete('/:id',isLogged,isAdmin, deleteSpecializationById)

export default router