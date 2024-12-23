import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true || "please provide the username"],
        unique:true
    },
    email:{
        type:String,
        required:[true || "please provide the email"],
        unique:true
    },
    password:{
        type:String,
        required:[true || "please provide the password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPAsswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
},{timestamps:true})

const User = mongoose.models.users || mongoose.model("User",userSchema)     //if it all ready exist use it otherwise create the new one

export default User