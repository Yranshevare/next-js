"use client"

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function page() {
  const [data , setData] = useState("")

  const router = useRouter()

  const logout = async() => {
    try {
      await axios.get('/api/users/logout')
      console.log("log out successfully")
      router.push('/login')
    } catch (error:any) {
      console.log("error while logout",error.message)
    }
  }

  const getUserDetail = async() => {
    const res = await axios.get('api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
  }
  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>profile</h1>
        <br />

        <p>profile page</p>
        <h2>{data === "" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <br />
        <button 
        onClick={logout}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded'
        >Logout</button>

        <button 
        onClick={getUserDetail}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded'
        >get user</button>

        
      </div>
    </div>
  )
}
