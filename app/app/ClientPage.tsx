'use client';

import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { useKeywordOpperations } from '../_modules/google-keyword-tracker/hooks/useKeywordOpperations';
import axios from 'axios';
import useGoogleToken from '../_hooks/useGoogleRefreshToken';

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
  const { refreshToken } = useGoogleToken('account')

  const handleFetchConnectedSites = async () => {
    // async getConnectedSites(refreshToken: string): Promise<PythonApiSite[] | null> {
      try {
        const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/get_sites?refresh_token=1//05RrSrqDcLoqUCgYIARAAGAUSNwF-L9IrCtKpNa8XCg_vayjD5GiIghZqfSw8QynLZrRdfDq5Asvxz3jkUmYgccfzfNFxmfSI1R4`;
        // TODO: check of ook met react query kan
        const res = await axios(url);
        console.log(res.data.siteEntry);
  
        return res.data.siteEntry;
      } catch (error) {
        console.error(error);
        return null
      }
    }

  return (
    <div>
      <button onClick={handleUpdateSession}>update session</button>
      <button onClick={handleClick}>getSession</button>
      <button onClick={handleSecondClick}>update user</button>
      <button onClick={() => addNewGoogleKeyword( "baristart\nEureka mignon\nEureka mignon specialita\n\nRocket appartamento" , 'cm10ys4200000q48b5bvyzw2a')}>process new google keywords</button>
      <button onClick={handleFetchConnectedSites}>fetch connected sites</button>
    </div>
  )
}

export default ClientPage