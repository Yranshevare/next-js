import { connectDb } from "@/db/index";      //@ - root directory
import User from "@/models/user.model.js"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";


connectDb()

export async function POST(request: NextRequest) {
    try {
        // const reqBody = await request.json()
        // const {username,email,password} = reqBody
        const {username,email,password} = await request.json()

        console.log("reqBody")

        //check if user is exist or not
        const user = await User.findOne({email:email})
        if(user){
            return NextResponse.json(
                {
                    error:"user already exist",
                    status:400
                }
            )
        }

        //hash the password
        const salt = await bcryptjs.genSalt(10)     //to generate the salt
        const hashPassword = await bcryptjs.hash(password,salt)     //creating the hash password 

        const newUser = new User({       //creating the new user to save t=in the database
            username,
            email,
            password : hashPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        //send verification email
        const option = await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        console.log(option)

        return NextResponse.json(
            {
                message:"user created successfully",
                success:true,
                savedUser
            }
        )

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        })
    }
}