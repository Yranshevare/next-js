import { connectDb } from "@/db/index";      //@ - root directory
import User from "@/models/user.model.js"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectDb()

export async function POST(request:NextRequest) {
    try {
        // const reqBody = request.json()
        const {email,password} = await request.json() 
        //check the user is exist or not
        const user =await  User.findOne({email})

        if(!user){      //if user dosen't exit send error
            return NextResponse.json({
                error:"user does not exist",
                status:400
            })
        }

        //checking password is correct or not
        const validatePassword = await bcryptjs.compare(password,user.password)
        if(!validatePassword){      
            return NextResponse.json({
                error:"invalid password",
                status:400
            })
        }


        //crete token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //creating the token
        const token = await jwt.sign(tokenData,process.env.JWT_TOKEN_SECRETE!,{expiresIn:"1d"})

        const response = NextResponse.json({
            message:"login successfully",
            success:true
        })
        response.cookies.set("token",token,{httpOnly:true})

        return response



    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            status:500
        })
    }
}

