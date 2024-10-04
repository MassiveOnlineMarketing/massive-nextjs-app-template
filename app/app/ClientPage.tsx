'use client';

import React from 'react'
import useRefreshOnUserChange from '../_hooks/useRefreshOnUserChange'

const ClientPage = ({ userId }: { userId: string }) => {
  useRefreshOnUserChange(userId)

  return (
    <div>ClientPage</div>
  )
}

export default ClientPage