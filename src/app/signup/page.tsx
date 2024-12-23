"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { tree } from 'next/dist/build/templates/app-page'

export default function page() {
  const router = useRouter()
  const [user,setUser] = useState({
    email:"",
    password:"",
    username:""
  })
  const [buttonDisabled,useButtonDisabled] = useState(false)
  const [loading,setLoading] = useState(false)

  const onSignup = async() => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user)
      console.log("signup successful",response.data)

      router.push("/login")
    } catch (error:any) {
      console.log("sign up failed",error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      useButtonDisabled(false)
    }else{
      useButtonDisabled(true)
    }
  },[user])


  return (
    <div className='flex flex-col item-center justify-center min-h-screen py-2 px-16'>
      <h1>{loading ? "processing" : "signup"}</h1>
      <br />
      
      <label htmlFor="username">username</label>
      <input 
        className='p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type="text" 
        id='username' 
        value={user.username} 
        onChange={(e)=>setUser({...user,username:e.target.value})} 
        placeholder='username' 
      />

      <label htmlFor="email">email</label>
      <input 
        className='p-2 border text-black  border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type="text" 
        id='email' 
        value={user.email} 
        onChange={(e)=>setUser({...user,email:e.target.value})} 
        placeholder='email' 
      />

      <label htmlFor="password">password</label>
      <input 
        className='p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type="password" 
        id='password' 
        value={user.password} 
        onChange={(e)=>setUser({...user,password:e.target.value})} 
        placeholder='password' 
      />

      <button 
        onClick={onSignup}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{ buttonDisabled ? "no signup" : "signup" }</button>

      <Link href="/login">visit login</Link>
    </div>
  )
}
