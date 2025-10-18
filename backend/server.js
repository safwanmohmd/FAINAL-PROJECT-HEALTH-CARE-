import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
import appointmentRoutes from "./routes/appointment.js"
import paymentRoutes from "./routes/payment.js"
import priscriptionRoutes from "./routes/prescriptions.js"
import cors from 'cors'
import specializationRoutes from "./routes/specialization.js"
import stripeRoutes from './routes/stripe.js'
import chatBotRoutes from './routes/chatBot.js'
//cfg
dotenv.config()
const app = express()



//main
mongoose.connect(process.env.mongoUri).then(
    console.log('connected to db')
).then(
    app.listen(process.env.PORT, () => {
        console.log(`server started on ${process.env.PORT}`);
    })
)




//routes
app.use(cors({origin:"https://fainal-project-health-care-51js.vercel.app"}));
app.use(express.json())
app.use('/api/auth',userRouter)
app.use('/api/appmnt', appointmentRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/prescriptions', priscriptionRoutes)
app.use('/api/specialization', specializationRoutes)
app.use('/api/stripe',stripeRoutes)
app.use("/api/chat",chatBotRoutes)

