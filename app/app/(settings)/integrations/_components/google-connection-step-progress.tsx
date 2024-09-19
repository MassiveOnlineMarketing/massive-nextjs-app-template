'use client';

import React from "react";
import useGoogleToken from "@/presentation/hooks/useGoogleRefreshToken";

import { cn } from "@/presentation/components/utils";

import { CheckCircleIcon } from "@heroicons/react/24/outline";

const SteppedProgressBar = () => {

  const { hasAccess: searchAuthenticated, hasGoogleAccount } = useGoogleToken("search-console");
  const { hasAccess: adsAuthenticated } = useGoogleToken("ads");

  return (
    <>
      <div className="mb-3 flex items-center justify-between text-base leading-6 font-normal text-gray-500">
        <p className="flex-1 text-left">Setup Google Account</p>
        <p className="flex-1 text-center">Setup Google Search</p>
        <p className="flex-1 text-right">Setup Google Ads</p>
      </div>
      <div className="flex items-center gap-5">
        {hasGoogleAccount ? (
          <CheckCircleIcon className="min-w-8 min-h-8 h-8 w-8 text-green-500" />
        ) : (
          <GrayDot className="min-w-5 min-h-5 w-5 h-5" />
        )}

        <div
          className={cn(
            "w-full h-[6px] rounded-full ",
            searchAuthenticated
              ? "bg-green-500"
              : hasGoogleAccount
                ? "bg-gradient-to-r from-green-500 to-gray-200"
                : "bg-gray-200",
          )}
        ></div>

        {searchAuthenticated ? (
          <CheckCircleIcon className="min-w-8 min-h-8 h-8 w-8 text-green-500" />
        ) : (
          <GrayDot className="min-w-5 min-h-5 w-5 h-5" />
        )}

        <div
          className={cn(
            "w-full h-[6px] rounded-full ",
            adsAuthenticated
              ? "bg-green-500"
              : searchAuthenticated
                ? "bg-gradient-to-r from-green-500 to-gray-200"
                : "bg-gray-200",
          )}
        ></div>

        {adsAuthenticated ? (
          <CheckCircleIcon className="min-w-8 min-h-8 h-8 w-8 text-green-500" />
        ) : (
          <GrayDot className="min-w-5 min-h-5 w-5 h-5" />
        )}
      </div>
    </>
  );
};

export default SteppedProgressBar;

const GrayDot = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 20"
    >
      <rect
        width="18.816"
        height="18.816"
        x="1.092"
        y="0.592"
        fill="#fff"
        rx="9.408"
      ></rect>
      <rect
        width="18.816"
        height="18.816"
        x="1.092"
        y="0.592"
        stroke="#D1D5DB"
        strokeLinecap="round"
        strokeWidth="1.184"
        rx="9.408"
      ></rect>
      <circle cx="10.5" cy="10" r="5.263" fill="#D1D5DB"></circle>
    </svg>
  );
};
