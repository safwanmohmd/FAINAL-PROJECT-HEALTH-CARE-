import express from 'express'
import { editUserById, getAllDoctors, getUserById, getUsers, login, register } from '../controllers/userController.js'
import { isAdmin, isLogged } from '../middlewares/auth.js'

const router = express.Router()

router.post('/login',login)
router.get('/user/:id' ,isLogged,isAdmin, getUserById)
router.get('/users',isLogged, getUsers)
router.get('/doctors',isLogged, getAllDoctors)
router.post('/register',register)
router.patch('/:id',isLogged,isAdmin, editUserById)



export default router