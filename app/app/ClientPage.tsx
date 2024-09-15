'use client';

import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { useKeywordOpperations } from '../_modules/google-keyword-tracker/hooks/useKeywordOpperations';

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

  const handleUpdateSession = async () => {
    try {
      await update({ user: { name: "John Doees" }})
      console.log("Session updated successfully in ClientPage")
    } catch (error) {
      console.error("Failed to update session in ClientPage", error)
    }
  }


  const { addNewGoogleKeyword } = useKeywordOpperations()

  return (
    <div>
      <button onClick={handleUpdateSession}>update session</button>
      <button onClick={handleClick}>getSession</button>
      <button onClick={handleSecondClick}>update user</button>
      <button onClick={addNewGoogleKeyword}>process new google keywords</button>
    </div>
  )
}

export default ClientPage