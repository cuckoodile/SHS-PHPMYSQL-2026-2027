import React from 'react'

export default function Card({user}) {
  return (
    <div className='border-2 p-4 rounded-lg'>
        {/* Null check... */}
        <p>{user?.first_name || "First Name"}</p>
    </div>
  )
}
