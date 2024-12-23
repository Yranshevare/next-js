"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function page() {
  const [user,setUser] = useState({
    email:"",
    password:"",
    username:""
  })

  const onSignup = async() => {

  }


  return (
    <div className='flex flex-col item-center justify-center min-h-screen py-2 px-16'>
      <h1>signup</h1>
      <br />
      
      <label htmlFor="username">username</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type="text" 
        id='username' 
        value={user.username} 
        onChange={(e)=>setUser({...user,username:e.target.value})} 
        placeholder='username' 
      />

      <label htmlFor="email">email</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type="text" 
        id='email' 
        value={user.email} 
        onChange={(e)=>setUser({...user,email:e.target.value})} 
        placeholder='email' 
      />

      <label htmlFor="password">password</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type="password" 
        id='password' 
        value={user.password} 
        onChange={(e)=>setUser({...user,password:e.target.value})} 
        placeholder='password' 
      />

      <button 
        onClick={onSignup}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >signup</button>

      <Link href="/login">visit login</Link>
    </div>
  )
}
