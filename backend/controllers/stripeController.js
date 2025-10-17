import Stripe from "stripe"
const stripe = new Stripe(process.env.stripe_secret)
export const createStripeUrl = async (req,res)=>{
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
}