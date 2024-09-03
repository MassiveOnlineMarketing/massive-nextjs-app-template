'use client';

import React from 'react'
import { logout } from '../actions';

const LogoutButton = () => {

  const handleClick = async () => {
    await logout();
  }

  return (
    <button onClick={handleClick}>LougoutButton</button>
  )
}

export default LogoutButton