'use client';

import React from 'react'

import { GoogleScopeOptions } from '@/src/infrastructure/services/authentication.service';
import useGoogleToken from '@/app/_modules/auth/hooks/useGoogleRefreshToken';

import IntegrationCard from './IntergrationCard';
import Button from './button';

interface GoogleCardProps {
  heading: string;
  subHeading?: string;
  Icon: React.ElementType;
  scope: GoogleScopeOptions;
  currentlyAvailable: boolean;
}

const GoogleServiceCard = ({
  heading,
  subHeading,
  Icon,
  scope,
  currentlyAvailable
}: GoogleCardProps) => {

  const { hasAccess, isLoading, hasGoogleAccount, authenticate, email } = useGoogleToken(scope);

  console.log('GoogleServiceCard', scope, hasAccess, hasGoogleAccount)

  if (!currentlyAvailable) {
    return (
      <IntegrationCard
        heading={heading}
        subHeading='This service is currently unavailable'
        Icon={Icon}
      >
        <Button variant='unavailable' disabled />
      </IntegrationCard>
    )
  }

  if (!hasGoogleAccount && scope === 'account') {
    return (
      <IntegrationCard
        heading={heading}
        subHeading=''
        Icon={Icon}
      >
        <Button variant='connect' onClick={() => authenticate('account')} />
      </IntegrationCard>
    )
  }

  if (!hasGoogleAccount) {
    return (
      <IntegrationCard
        heading={heading}
        subHeading='Please first connect your Google Account'
        Icon={Icon}
      >
        <Button variant='unavailable' disabled />
      </IntegrationCard>
    )
  }

  if (isLoading) {
    return (
      <IntegrationCard
        heading={heading}
        subHeading='Loading...'
        Icon={Icon}
      >
        Loading
      </IntegrationCard>
    )
  }

  if (hasAccess || hasGoogleAccount && scope === 'account') {
    return (
      <IntegrationCard
        heading={heading}
        subHeading={email}
        Icon={Icon}
      >
        <Button variant='connected' disabled />
      </IntegrationCard>
    )
  }

  return (
    <IntegrationCard
      heading={heading}
      subHeading=''
      Icon={Icon}
    >
      <Button variant='connect' onClick={() => authenticate(scope)} />
    </IntegrationCard>
  )
}

export default GoogleServiceCard