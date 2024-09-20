import { cn } from '@/app/_components/utils'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Message = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn(
      'p-4 border border-base-500 rounded-lg flex items-center gap-2 text-base-500',
      'bg-gradient-to-b from-[#7857fe]/0 to-[#7857fe]/[0.09]',
      className
    )}>
      <ShieldCheckIcon className='w-6 h-6' />
      <p className='text-sm'>{children}</p>
    </div>
  )
}

export default Message