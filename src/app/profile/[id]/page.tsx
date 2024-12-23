import React from 'react'

export default function userProfilePage({params}:any) {     //params is for type any
  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>profile</h1>
        <br />

        <p className='text-4xl '>profile page {params.id}</p>

        
      </div>
    </div>
  )
}
