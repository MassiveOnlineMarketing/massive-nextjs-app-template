'use client';

import Link from "next/link";
import React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormInputSelect, FormInputSelectContent, FormInputSelectItem, FormInputSelectTrigger, FormInputSelectValue, FormInputField } from '../components/form';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { ConnectedGscProperties } from "@/src/application/api/search-console.api.types";
import { Control, FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface GoogleSearchConsolePropertyInputSelectorProps<T extends FieldValues> {
  hasAccess: boolean;
  isLoading?: boolean;
  sites: ConnectedGscProperties[] | undefined;
  form: UseFormReturn<T>;
  isPending: boolean;
}

// ! if updating this component, make sure to also update the UpdateWebsiteForm component
export const GoogleSearchConsolePropertyInputSelector = <T extends FieldValues,>({ hasAccess, isLoading, sites, form, isPending }: GoogleSearchConsolePropertyInputSelectorProps<T>) => {

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

  return (
    <FormField
      control={form.control as Control<T>}
      name={"gscUrl " as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='flex items-center gap-1.5'>Google Search Console Property <InformationCircleIcon className='w-4 h-4 text-base-500' /></FormLabel>
          <FormInputSelect onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
            <FormControl>
              <FormInputSelectTrigger disabled={isPending}>
                <FormInputSelectValue placeholder="Select a property" />
              </FormInputSelectTrigger>
            </FormControl>
            <FormInputSelectContent>
              <FormInputSelectItem value="noWebsite">Don&apos;t use a property</FormInputSelectItem>
              {sites ? (
                sites.map((site) => (
                  <FormInputSelectItem key={site.siteUrl} value={site.siteUrl}>
                    {site.siteUrl}
                  </FormInputSelectItem>
                ))
              ) : (
                <div className='w-full h-20 flex items-center justify-center'>
                  <p className='text-sm'>No Properties found</p>
                </div>
              )}
            </FormInputSelectContent>
          </FormInputSelect>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}