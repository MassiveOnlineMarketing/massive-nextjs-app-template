'use client';

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';

import BreadCrumbsSettings from './_components/BreadCrumbs'
import PageTitle from './_components/PageTitle';
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import { WebsiteWithLocation } from '@/src/entities/models/website';

const UUID_LENGTH = 25;

export type BreadCrumbItem = {
  name: string;
  href: string;
  current: boolean;
};


function capitalizedPath(path: string) {
  return path.charAt(0).toUpperCase() + path.slice(1);
}

export default function Layout(
  { children }: { children: React.ReactNode }
) {
  const pathname = usePathname();
  const websitesStore = useWebsiteDetailsStore(state => state.websites);

  const lastPath = pathname.split("/").filter(Boolean).pop() || "";
  const pathSegments = pathname.split("/").filter(Boolean);
  const secondToLastPath = pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : "";
  const [pageTitle, setPageTitle] = useState<string>(capitalizedPath(lastPath))
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumbItem[]>([])

  useEffect(() => {
    // console.log('useEffect path', pathname)

    const pageTTitle = getPageTitle(lastPath, secondToLastPath, websitesStore)
    const breadCrumbs = generateBreadCrumbs2(pathSegments, pageTTitle)
    // console.log('pageTTitle', pageTTitle)
    // console.log('generateBreadCrumbs', breadCrumbs)
    setPageTitle(pageTTitle)
    setBreadCrumbs(breadCrumbs)

    // console.log('pathSegments', pathSegments)


    // setBreadCrumbs(newBreadCrumb)
  }, [pathname])


  return (
    <>
      <div className='max-w-[918px] mx-auto py-5'>
        {children}
      </div>
    </>
  )
}

function getPageTitle(path: string, secondToLastPath: string, websitesStore: WebsiteWithLocation[] | undefined): string {
  if (path.length === UUID_LENGTH) {
    // console.log('secondToLastPath', secondToLastPath);

    // Set location as page title
    if (secondToLastPath === 'location') {
      if (!websitesStore) return capitalizedPath(path);
      const websiteWithLocation = websitesStore.find(website =>
        website.location?.some(location => location.id === path)
      );

      const locationString = websiteWithLocation?.location?.find(location => location.id === path)?.location;
      if (locationString) {
        return capitalizedPath(locationString);
      }

      const country = websiteWithLocation?.location?.find(location => location.id === path)?.country;
      if (country) {
        return capitalizedPath(country);
      }

      return capitalizedPath(path); // Default return value if no location or country is found
    }

    if (secondToLastPath === 'website') {
      if (!websitesStore) return capitalizedPath(path);
      const website = websitesStore.find(website => website.id === path);
      console.log('website', website);
      if (website) {
        return capitalizedPath(website.websiteName);
      }
      return capitalizedPath(path); // Default return value if no website is found
    }
    return capitalizedPath(path);
  }
  return capitalizedPath(path);
}

function generateBreadCrumbs(pathSegments: string[], pageTitle: string) {
  const newBreadCrumb = pathSegments.map((path, index) => {
    if (path === 'app') {
      return { name: 'Home', href: '/app', current: false };
    }
    // Accumulate the path segments to build the correct href
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    if (path.length === UUID_LENGTH) {
      return { name: pageTitle, href, current: false };
    }
    // If the last path segment is a UUID, set the page title to the capitalized path
    if (index === pathSegments.length - 1) {
      if (path.length === UUID_LENGTH) {
        return { name: pageTitle, href, current: true };
      }
    }

    return { name: path, href, current: false };
  });

  return newBreadCrumb
}

function generateBreadCrumbs2(pathSegments: string[], pageTitle: string) {
  const newBreadCrumb = pathSegments.map((path, index) => {
    if (path === 'app') {
      return { name: 'Home', href: '/app', current: false };
    }

    if (path === 'settings') {
      return { name: 'Settings', href: '/app/settings', current: false };
    }

    if (path === 'integrations') {
      return { name: 'Integrations', href: '/app/settings/integrations', current: false };
    }

    if (index === pathSegments.length - 1){
      if (path === 'website') {
        return { name: pageTitle, href: '/app/settings/website', current: false };
      }
    }

    // // Accumulate the path segments to build the correct href
    // const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    // if (path.length === UUID_LENGTH) {
    //   return { name: pageTitle, href, current: false };
    // }
    // // If the last path segment is a UUID, set the page title to the capitalized path
    // if (index === pathSegments.length - 1) {
    //   if (path.length === UUID_LENGTH) {
    //     return { name: pageTitle, href, current: true };
    //   }
    // }

    return { name: path, href: 'h', current: false };
  });

  return newBreadCrumb
}