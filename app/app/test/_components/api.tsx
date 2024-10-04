'use client';

import React from 'react'
import { useKeywordOpperations } from '@/app/_modules/google-keyword-tracker/hooks/useKeywordOpperations'
import useGoogleToken from '@/app/_modules/auth/hooks/useGoogleRefreshToken';
import axios from 'axios';

const ProcessKeywordTest = () => {
    const { addNewGoogleKeyword } = useKeywordOpperations()
    return (
        <button onClick={() => addNewGoogleKeyword("baristart\nEureka mignon\nEureka mignon specialita\n\nRocket appartamento", 'cm10ys4200000q48b5bvyzw2a')}>process keywords</button>
    )
}

const FetchConnectedSitesTest = () => {
    const { refreshToken } = useGoogleToken('search-console')

    const handleFetchConnectedSites = async () => {
      // async getConnectedSites(refreshToken: string): Promise<PythonApiSite[] | null> {
      try {
        const url = `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/get_sites?refresh_token=${refreshToken}`;
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
        <button onClick={handleFetchConnectedSites}>fetch connected sites</button>
    )
}

export {FetchConnectedSitesTest, ProcessKeywordTest}