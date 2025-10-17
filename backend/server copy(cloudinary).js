import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
import appointmentRoutes from "./routes/appointment.js"
import paymentRoutes from "./routes/payment.js"
import priscriptionRoutes from "./routes/prescriptions.js"
import cors from 'cors'
import Stripe from "stripe"
import CookieParser from 'cookie-parser'
import specializationRoutes from "./routes/specialization.js"
import { upload } from './config/cloudinary.js'
import bookModel from './models/bookmodel.js'
import OpenAI from "openai"
dotenv.config()
const app = express()
mongoose.connect(process.env.mongoUri).then(
    console.log('connected to db')
).then(
    app.listen(process.env.PORT, () => {
        console.log(`server started on ${process.env.PORT}`);
    })
)
app.use(cors());




app.use(express.json())
app.use(CookieParser())

const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_API
})

app.post("/api/chat", async (req,res)=>{
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
})
app.use('/api/auth',userRouter)
app.use('/api/appmnt', appointmentRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/prescriptions', priscriptionRoutes)
app.use('/api/specialization', specializationRoutes)

const stripe = new Stripe(process.env.stripe_secret)
app.post("/api/stripe", async (req,res)=>{
    try {
        const {items} = req.body
        const lineItems = items.map(item =>({
            price_data:{
                currency:"usd",
                product_data:{
                    name:item.name
                },
                
                unit_amount:item.price*100
                    
                
            },
             quantity: item.quantity || 1,
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],line_items:lineItems,mode:"payment",success_url:"http://localhost:5173/payment-success",cancel_url:"http://localhost:5173/payment-failed"
        })
        res.json({ id:session.id,url:session.url})
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/api/books", async (req,res)=>{
     const books = await bookModel.find({});
  res.status(200).json({ message: "Prescriptions fetched successfully", books });
})
app.post("/api/addbook", upload.single('profile'),async (req,res)=>{
    if(!req.file){
        return res.json("img required")
    }
    const {title, price} = req.body
    const newbook = {
title,
price,
img:req.file.path
    }
    const createBok = await bookModel.create(newbook)
    const {path,filename} = req.file
    res.json({message : "book added successfully", book:createBok})
})