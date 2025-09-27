import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["doctor", "patient"],
        default: "patient",
    },
    specialization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'specializations',
        default: null
    },
    approved: {
        type: String,
        enum: ["approved", "rejected", "pending"],
        default: "pending"

    }

})

const userModel = mongoose.model('users', userSchema)
export default userModel