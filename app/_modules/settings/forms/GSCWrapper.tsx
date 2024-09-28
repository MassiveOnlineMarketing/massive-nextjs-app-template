import Link from 'next/link';
import React from 'react'

type GSCWrapperProps = {
    children: React.ReactNode;
    isLoading: boolean;
    hasAccess: boolean;
}

/**
 * A wrapper component for Google Search Console (GSC) related content.
 * 
 * This component handles the loading state and access permissions for GSC.
 * It displays appropriate messages when the data is loading or when the user
 * does not have access to the GSC property. If the data is loaded and the user
 * has access, it renders the children components.
 * 
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to render when data is loaded and access is granted.
 * @param {boolean} props.isLoading - A flag indicating whether the data is currently loading.
 * @param {boolean} props.hasAccess - A flag indicating whether the user has access to the GSC property.
 * 
 * @returns {JSX.Element} The rendered component based on the loading and access states.
 */
const GSCWrapper = ({children, isLoading, hasAccess}: GSCWrapperProps) => {
    if (isLoading) {
        return (
          <div>
            <p className='font-normal text-sm text-slate-500'>Google Search Console Property</p>
            <div className='inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 ring-base-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'>
              <p className="text-gray-500 font-normal">Loading...</p>
            </div>
          </div>
        )
      }
    
      if (!hasAccess) {
        return (
          <div>
            <p className='font-normal text-sm text-slate-500'>Google Search Console Property</p>
            <div className='inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border theme-b-p bg-primary-50/50 placeholder-gray-400 ring-base-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'>
              <p className="text-gray-500 font-normal">
                Authenticate your{" "}
                <Link
                  href="/app/integrations"
                  className="text-base-500"
                >
                  Search Console{" "}
                </Link>
                Account
              </p>
            </div>
          </div>
        )
      }

      return children
}

export default GSCWrapper