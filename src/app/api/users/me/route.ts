import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectDb } from "@/db/index";


connectDb()

export async function GET(request :NextRequest){
    try {
        const userID = await getDataFromToken(request)
        const user = await User.findById({_id: userID}).select("-password")
        // console.log(user)
        return NextResponse.json({
            message:'user found',
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            status:400
        })
    }
}
