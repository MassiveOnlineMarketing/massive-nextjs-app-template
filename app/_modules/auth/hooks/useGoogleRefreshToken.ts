'use client';

import { useState, useEffect } from 'react';
import { useUserAccountStore } from '@/app/_stores/useUserAccountStore';

import { signIn } from 'next-auth/react';
import jwt from "jsonwebtoken";

import { GoogleScopeOptions, SCOPE_URLS } from '@/src/infrastructure/services/authentication.service';



const useGoogleToken = (requiredScope: GoogleScopeOptions) => {
  const accountDetails = useUserAccountStore((state) => state.accountDetails)

  const [hasAccess, setHasAccess] = useState(false);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accountDetails || !accountDetails.scope) {
      console.error('Google token AccountDetails not found');
      setIsLoading(false);
      return;
    }
    setHasAccess(accountDetails.scope.includes(SCOPE_URLS[requiredScope]));
    setRefreshToken(accountDetails.refresh_token);
    setIsLoading(false);

    console.log('accountDetails', accountDetails);
    

  }, [requiredScope, accountDetails]);

  let decodedToken: jwt.JwtPayload | null = null;
  if (accountDetails && accountDetails.id_token) {
    decodedToken = jwt.decode(accountDetails.id_token) as jwt.JwtPayload;
  }

  async function authenticate(scope: GoogleScopeOptions) {
    const scopes = accountDetails?.scope ? `${accountDetails?.scope} ${SCOPE_URLS[scope]}` : SCOPE_URLS[scope];
    let decodedToken: jwt.JwtPayload | null = null;
    if (accountDetails && accountDetails.id_token) {
      decodedToken = jwt.decode(accountDetails.id_token) as jwt.JwtPayload;
    }

    console.log('scopes', scopes);
    console.log('decodedToken', decodedToken);

    const test = await signIn(
      'google',
      { callbackUrl: '/app/integrations' },
      {
        prompt: 'consent',
        scope: scopes,
        access_type: 'offline',
        login_hint: decodedToken?.email || '',
      }
    )
    console.log('test', test);
  }

  return { hasAccess, refreshToken, isLoading, hasGoogleAccount: !!accountDetails, authenticate, email: decodedToken?.email };
};

export default useGoogleToken;