import React from 'react'
import AddKeywordsFrom from '../../../forms/AddGoogleKeywordsFrom';
import {  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/_components/ui/dialog';


const ResultAddKeywordsModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => setOpen(true)}
      >
        {children}
      </DialogTrigger>
      <DialogContent className='theme-bg-w'>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold theme-t-p">
            Add additional keywords to the keyword tracker
          </DialogTitle>
          {/* <DialogDescription className='ftext-sm theme-t-t pt-[4px]'>
            Please enter the keywords you want to track separated by enter.
          </DialogDescription> */}
        </DialogHeader>

        <AddKeywordsFrom setOpen={setOpen} />
        
      </DialogContent>
    </Dialog>
  )
}

export default ResultAddKeywordsModal