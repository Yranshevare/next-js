"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function page() {
  const router = useRouter()
  const [user,setUser] = useState({
    email:"",
    password:"",
  })

  const [buttonDisabled,useButtonDisabled] = useState(false)
  const [loading,setLoading] = useState(false)

  const onLogin = async() => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      console.log("log in success",response.data)
      router.push('/profile')


    } catch (error:any) {
      console.log("login failed",error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
        useButtonDisabled(false)
      }else{
        useButtonDisabled(true)
      }
    },[user])


  return (
    <div className='flex flex-col item-center justify-center min-h-screen py-2 px-16'>
      <h1>{loading ? "processing" : "login"}</h1>
      <br />

      <label htmlFor="email">email</label>
      <input 
        className='p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
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
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >login</button>

      <Link href="/signup">visit signup</Link>
    </div>
  )
}
