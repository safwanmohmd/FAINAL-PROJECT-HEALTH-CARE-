import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price : Number,
   img:String
   
})

const bookModel = mongoose.model('book', userSchema)
export default bookModel