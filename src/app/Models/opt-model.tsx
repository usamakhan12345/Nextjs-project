import mongoose from 'mongoose'

const {Schema} = mongoose 

const otpSchema = new Schema({
    email : {
        type : String,
        required : true 
    } ,
    otpCode : {
        type : String,
        required : true 
    } ,


})

const Otp = mongoose.model('OTP' , otpSchema)

export default Otp