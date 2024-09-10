import React from "react";
import Link from "next/link";

import BackAndForwardButtons from "./BackAndForwardButtons";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { BreadCrumbItem } from "../layout";


const BreadCrumbsSettings = ({
  breadCrumbs
}: {
  breadCrumbs?: BreadCrumbItem[];
}) => {

  // console.log('breadCrumbs', breadCrumbs)

  // console.log('path', path)
  // console.log('secondPath', secondPath)
  // console.log('thirdPath', thirdPath)

  return (
    <div className="sticky top-0 z-10 px-6 py-4 w-full bg-white dark:bg-dark-bg-light rounded-t-xl border-b border-light-stroke dark:border-dark-stroke flex justify-between items-center">
      <p className="inline-flex items-center gap-4 text-sm leading-5 font-base text-light-text-light dark:text-dark-text-dark">
        {/* <Link href="/app/">Home</Link>
        <span><ChevronRightIcon className="w-4 h-4" /></span>
        <Link href="/app/settings">Settings</Link> */}

        {breadCrumbs && breadCrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span><ChevronRightIcon className="w-4 h-4" /></span>
            <Link href={crumb.href}>{crumb.name}</Link>
          </React.Fragment>
        ))}

        {/* {path !== 'Settings' && path && (
          <>
            <span><ChevronRightIcon className="w-4 h-4" /></span>
            <span className="text-[#2C3462] dark:text-gray-500">{path}</span>
          </>
        )}
        {secondPath && (
          <>
            <span><ChevronRightIcon className="w-4 h-4" /></span>
            <span className="text-[#2C3462] dark:text-gray-500">{secondPath}</span>
          </>
        )}
        {thirdPath && (
          <>
            <span><ChevronRightIcon className="w-4 h-4" /></span>
            <span className="text-[#2C3462] dark:text-gray-500">{thirdPath}</span>
          </>
        )} */}
      </p>
      <BackAndForwardButtons />
    </div>
  );
};

export default BreadCrumbsSettings;
