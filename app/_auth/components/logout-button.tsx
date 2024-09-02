'use client';

import React from 'react'
import { logout } from '../actions/logout';

const LogoutButton = () => {

  const handleClick = async () => {
    await logout();
  }

  return (
    <button onClick={handleClick}>LougoutButton</button>
  )
}

export default LogoutButton