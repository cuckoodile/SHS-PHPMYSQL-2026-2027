import React from 'react'

export default function Card({user}) {
  return (
    <div>
        {/* Null check... */}
        <p>{user?.first_name || "First Name"}</p>
    </div>
  )
}
