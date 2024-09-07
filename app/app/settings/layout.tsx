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

  const pathSegments = pathname.split("/").filter(Boolean);
  const secondToLastPath = pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : "";

  // console.log('pathname ------------------------------------', pathname)
  // console.log('lastPath', lastPath)
  // console.log('secondToLastPath', secondToLastPath)



  let capitalizedPath = null
  let secondPath = null  
  let thirdPath = null

  if (secondToLastPath === "website") {
    capitalizedPath = 'Website';
    secondPath = lastPath.charAt(0).toUpperCase() + lastPath.slice(1).toLowerCase();
  } else if (secondToLastPath === 'location'){
    capitalizedPath = 'Website';
    secondPath = secondToLastPath.charAt(0).toUpperCase() + secondToLastPath.slice(1).toLowerCase();
    thirdPath = lastPath.charAt(0).toUpperCase() + lastPath.slice(1).toLowerCase();
  } else {
    capitalizedPath = lastPath.charAt(0).toUpperCase() + lastPath.slice(1).toLowerCase();
  }

  return (
    <>
      <BreadCrumbsSettings path={capitalizedPath} secondPath={secondPath} thirdPath={thirdPath} />
      <PageTitle path={capitalizedPath} />
      <div className='max-w-[918px] mx-auto py-5'>
        {children}
      </div>
    </>
  )
}

