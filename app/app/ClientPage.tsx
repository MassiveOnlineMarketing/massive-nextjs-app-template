'use client';

import React from 'react'
import useRefreshOnUserChange from './_components/useRefreshOnUserChange';

import { useCurrentUser } from '@/app/_modules/auth/hooks/user-current-user';

import { testController } from '@/src/interface-adapters/controllers/test.controller';
import { GetSessionTest, UpdateSessionTest, UpdateUserTest } from './_components/session';
import { FetchConnectedSitesTest, ProcessKeywordTest } from './_components/api';

const ClientPage = ({ userId }: { userId: string }) => {
  // ! This hook is necessary to refresh the application when the user changes their account.
  useRefreshOnUserChange(userId);

  const currentUser = useCurrentUser()

  const handleTestController = async () => {
    testController()
  }

  return (
    <div >
      <p>Panel</p>
      <div className='grid grid-cols-4 place-items-center '>
        <UpdateSessionTest />
        <GetSessionTest />
        <UpdateUserTest />
        <ProcessKeywordTest />
        <FetchConnectedSitesTest />
        <button onClick={handleTestController}>TEST CONTROLLER</button>
      </div>
      <p>Client session - User</p>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  )
}

export default ClientPage