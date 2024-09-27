'use client'

import { getSession, useSession } from 'next-auth/react'
import React from 'react'

const UpdateSessionTest = () => {

  const { update } = useSession()

  const handleUpdateSession = async () => {
    try {
      await update({ user: { name: "John Doees" } })
      console.log("Session updated successfully in ClientPage")
    } catch (error) {
      console.error("Failed to update session in ClientPage", error)
    }
  }

  return (
    <button onClick={handleUpdateSession}>update session</button>
  )
}
const GetSessionTest = () => {

  const handleClick = async () => {
    const session = await getSession()
    console.log(session)
  }


  return (
    <button onClick={handleClick}>getSession</button>
  )
}
const UpdateUserTest = () => {
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
  return(
    <button onClick={handleSecondClick}>update user</button>
  )
}
export { UpdateSessionTest, GetSessionTest, UpdateUserTest }