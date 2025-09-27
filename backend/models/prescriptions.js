import mongoose, { mongo } from "mongoose";

const priscriptionSchema = mongoose.Schema({
    appoinment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appoinment",
        required: true
    },
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    medicines:{
        type:String,
        required:true

    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

})

const priscriptionModel = mongoose.model('prescriptions',priscriptionSchema)

export default priscriptionModel