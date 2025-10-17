import express from 'express'
import OpenAI from "openai"
import { chatBot } from '../controllers/chatBotController.js'


const router = express.Router()
const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_API
})




router.post("/", chatBot)

export default router