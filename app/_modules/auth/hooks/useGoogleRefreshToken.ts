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

  // This effect loads the state of the Google access.
  useEffect(() => {
    if (!accountDetails || !accountDetails.scope) {
      console.log('Google account not found');
      setIsLoading(false);
      return;
    }
    setHasAccess(accountDetails.scope.includes(SCOPE_URLS[requiredScope]));
    setRefreshToken(accountDetails.refresh_token);
    setIsLoading(false);
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

    await signIn(
      'google',
      { callbackUrl: '/app/integrations' },
      {
        prompt: 'consent',
        scope: scopes,
        access_type: 'offline',
        login_hint: decodedToken?.email || '',
      }
    )
  }

  return { hasAccess, refreshToken, isLoading, hasGoogleAccount: !!accountDetails, authenticate, email: decodedToken?.email };
};

export default useGoogleToken;