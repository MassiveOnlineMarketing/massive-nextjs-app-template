'use client';

import { useEffect } from 'react';

import { useUserAccountStore } from '../_stores/useUserAccountStore';
import { Account } from '@prisma/client';


export const UserAccountStoreProvider = ({ account }: {account: Account | null;}) => {
  // console.log('re render account', account)

  const setUserAccount = useUserAccountStore((state) => state.setAccountDetails);
  useEffect(() => {
    setUserAccount(account);
  }, []);

  return null;
};