import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request:NextRequest) => {
    try {
        const encodedToken = request.cookies.get('token')?.value || ''  //gating the token if it is not there set the '' ( empty string ) 
        const decodedToken:any = jwt.verify(encodedToken,process.env.JWT_TOKEN_SECRETE!)
        return decodedToken.id
    } catch (error:any) {
        console.log(error.message)
    }
}