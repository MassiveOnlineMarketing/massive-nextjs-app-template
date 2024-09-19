'use server'

import React from 'react'
import { db } from '@/prisma';

import { auth } from '../_modules/auth/_nextAuth';
import { UserAccountStoreProvider } from './UserAccountStoreProvider';


const ServerProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  const userId = session?.user.id

  let account = null;
  if (userId) {
    account = await db.account.findFirst({
      where: { userId },
    });

  }

  return (
    <>
      <UserAccountStoreProvider account={account} />
      {children}
    </>
  )
}

export default ServerProvider