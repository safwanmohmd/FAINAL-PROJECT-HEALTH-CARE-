import express from 'express'
import { editUserById, getAllDoctors, getUserById, getUserFullHistory, getUsers, login, register } from '../controllers/userController.js'
import { isAdmin, isDoctor, isLogged } from '../middlewares/auth.js'

const router = express.Router()

router.post('/login',login)
router.get('/user/:id' ,isLogged,isAdmin, getUserById)
router.get('/users', getUsers)
router.get('/doctors',isLogged, getAllDoctors)
router.post('/register',register)
router.patch('/:id',isLogged,isAdmin, editUserById)
router.get("/history/:id" ,isLogged,isDoctor, getUserFullHistory)


export default router