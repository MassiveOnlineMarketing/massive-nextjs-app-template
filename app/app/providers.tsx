'use client'

import React from 'react'

import { ThemeProvider } from 'next-themes';
import { Toaster } from '../_components/ui/toast/toaster';
import { TooltipProvider } from '../_components/ui/tooltip';
import { usePopulateAccountStore } from '../_hooks/usePopulateAccountStore';

function Providers(
  { children }: { children: React.ReactNode }
) {

  usePopulateAccountStore()


  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers