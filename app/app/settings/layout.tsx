'use client';

import React from 'react'
import { usePathname } from 'next/navigation';

import BreadCrumbsSettings from './_components/BreadCrumbs'
import PageTitle from './_components/PageTitle';

export default function Layout(
  { children }: { children: React.ReactNode }
) {
  const pathname = usePathname();
  const lastPath = pathname.split("/").filter(Boolean).pop() || "";

  const capitalizedPath = lastPath.charAt(0).toUpperCase() + lastPath.slice(1).toLowerCase();
  return (
    <>
      <BreadCrumbsSettings path={capitalizedPath} />
      <PageTitle path={capitalizedPath} />
      <div className='max-w-[918px] mx-auto py-5'>
        {children}
      </div>
    </>
  )
}

