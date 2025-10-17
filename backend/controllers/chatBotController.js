import express from 'express'
import OpenAI from "openai"


const router = express.Router()
const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_API
})


export const chatBot = async (req,res)=>{
    try {
    const {message} = req.body
    const response = await openai.chat.completions.create({
        model:"gpt-4o-mini",
        messages:[{role : "user", content:message}]
    })
    res.json({reply: response.choices[0].message.content})
} catch (error) {
    console.log(error.message);
}
}