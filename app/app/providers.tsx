'use client'

import React from 'react'

import { ThemeProvider } from 'next-themes';
import { Toaster } from '../_components/ui/toast/toaster';
import { TooltipProvider } from '../_components/ui/tooltip';
import ServerProvider from '../_providers/ServerProvider';

function Providers(
  { children }: { children: React.ReactNode }
) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <ServerProvider>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </ServerProvider>I
    </ThemeProvider>
  )
}

export default Providers