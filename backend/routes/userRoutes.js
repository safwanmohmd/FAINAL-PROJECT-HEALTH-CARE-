import express from 'express'
import { editUserById, getAllDoctors, getUserById, getUsers, login, register } from '../controllers/userController.js'
import { isAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.post('/login',login)
router.get('/user/:id' , getUserById)
router.get('/users', getUsers)
router.get('/doctors', getAllDoctors)
router.post('/register',register)
router.patch('/:id', editUserById)



export default router