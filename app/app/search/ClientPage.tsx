'use client';

import { useCurrentUser } from '@/app/(auth)/_hooks/user-current-user';
import { getSession, useSession } from 'next-auth/react'
import React from 'react'

const ClientPage = () => {
  const { update } = useSession()
  const currentUser = useCurrentUser()
  console.log('user',currentUser)

  const handleClick = async () => {
    const session = await getSession()
    console.log(session)
  }

  const user = {
    name: "John Doe",
    email: "asdf@sdf.nl",
    role: "admin",    
  }

  const handleSecondClick = async () => { 
    const updateSession = {
      ...user,
      name: "John askl",
    }
    console.log(updateSession)
  }

  return (
    <div>
      <button onClick={() => update({ user: { name: "John Doe" }})}>update session</button>
      <button onClick={handleClick}>getSession</button>
      <button onClick={handleSecondClick}>update user</button>
    </div>
  )
}

export default ClientPage