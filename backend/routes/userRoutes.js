import express from 'express'
import { getAllDoctors, getUserById, getUsers, login, register } from '../controllers/userController.js'

const router = express.Router()

router.post('/login',login)
router.get('/user/:id' , getUserById)
router.get('/users', getUsers)
router.get('/doctors', getAllDoctors)
router.post('/register',register)



export default router