import express from 'express'

import { createStripeUrl } from '../controllers/stripeController.js'
import { isLogged } from '../middlewares/auth.js'

const router = express.Router()


router.post("/",isLogged, createStripeUrl)

export default router