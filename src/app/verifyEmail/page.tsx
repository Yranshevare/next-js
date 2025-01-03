"use client"
import axios from "axios"
import Link from "next/link"
import React,{ useState,useEffect } from "react"

export default function verifyEmailPage (){
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)

    const verifyUserEmail = async() => {
        try {
            await axios.post('/api/users/verifyEmail',{token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken  || "")
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl"> verify Email</h1>
            <h2>{token?`${token}`:"no token"}</h2>

            {
                verified && (
                    <div>
                        <h2>email verified</h2>
                        <Link href="/login">login</Link>
                    </div>
                )
            }

            
            {
                error && (
                    <div>
                        <h2>error</h2>
                    </div>
                )
            }
        </div>
    )
}