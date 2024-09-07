'use client'


import React, { useState, useTransition } from 'react'
import Link from 'next/link';

import { z } from 'zod';
import { websiteInputSchema } from '@/src/interface-adapters/controllers/website/create-website.controller';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createWebsite } from '../../actions';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../_components/form/SettingsForm';
import { FormInputField } from '../../_components/form/SettingsFromInput';
import { FormInputSelect, FormInputSelectContent, FormInputSelectItem, FormInputSelectTrigger, FormInputSelectValue } from '../../_components/SettingsFormInputs';

import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '../../_components/SettingsCard';
import { FormError } from '@/app/(auth)/_forms/form-error';
import { FormSuccess } from '@/app/(auth)/_forms/form-success';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

type PythonApiSite = {
  permissionLevel: string;
  siteUrl: string;
};

type DefaultValues = {
  id: string,
  websiteName: string,
  domainUrl: string,
  gscUrl: string | null,
}

const UpdateWebsiteForm = ({ defaultValues }: { defaultValues: DefaultValues }) => {
  const REFRESH_TOKEN = ' '
  const HAS_ACCESS = true

  console.log('REFRESH_TOKEN', REFRESH_TOKEN)
  if (!REFRESH_TOKEN) {
    throw new Error('No refresh token found')
  }

  const [gscProperties, setGscProperties] = useState<PythonApiSite[] | null>([
    {
      "permissionLevel": "siteFullUser",
      "siteUrl": "https://baristart.nl/"
    },
    {
      "permissionLevel": "siteOwner",
      "siteUrl": "sc-domain:massiveonlinemarketing.nl"
    },
    {
      "permissionLevel": "siteFullUser",
      "siteUrl": "sc-domain:baristart.nl"
    },
    {
      "permissionLevel": "siteFullUser",
      "siteUrl": "https://www.fiveelephant.com/"
    }
  ])

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof websiteInputSchema>>({
    resolver: zodResolver(websiteInputSchema),
    defaultValues: {
      websiteName: defaultValues.websiteName,
      domainUrl: defaultValues.domainUrl,
      gscUrl: defaultValues.gscUrl || undefined,
    }
  });

  const onSubmit = async (values: z.infer<typeof websiteInputSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      throw new Error('Not implemented')

      // TODO: Add update website action
      const res = await createWebsite(values);
      console.log('res', res)

      if (res.error) {
        setError(res.error);
      }

      if (res.createdWebsite) {
        setSuccess("Website created successfully");
        // TODO: Add website to websites store
        form.reset({
          websiteName: "",
          domainUrl: "",
          gscUrl: "",
        });
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mx-6 mb-5'>
          <CardHeader className='flex flex-row items-center gap-[6px]'>
            <GlobeAltIcon className='w-4 h-4 text-p-800' />
            <p className='font-medium text-p-800'>Website Settings</p>
          </CardHeader>
          <CardContent className='space-y-3'>
            <FormField
              control={form.control}
              name="websiteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website project name</FormLabel>
                  <FormControl>
                    <FormInputField
                      {...field}
                      disabled={isPending}
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domainUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain url</FormLabel>
                  <FormControl>
                    <FormInputField
                      {...field}
                      disabled
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <GoogleSearchConsolePropertyInputSelector hasAcces={HAS_ACCESS} sites={gscProperties} form={form} />

          </CardContent>
        </Card>

        <div className='px-6 flex'>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            size='default'
            variant='outline'
            className='ml-auto'
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  )
}


const GoogleSearchConsolePropertyInputSelector = ({ hasAcces, isLoading, sites, form }: { hasAcces: boolean, isLoading?: boolean, sites: PythonApiSite[] | null, form: UseFormReturn<z.infer<typeof websiteInputSchema>> }) => {

  console.log('sites', sites)

  if (!hasAcces) {
    return (
      <div>
        <p className='font-normal text-sm text-slate-500'>Google Search Console Property</p>
        <div className='inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border border-p-100 bg-primary-50/50 placeholder-gray-400 ring-p-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'>
          <p className="text-gray-500 font-normal">
            Authenticate your{" "}
            <Link
              href="/app/settings/integrations"
              className="text-p-500"
            >
              Search Console{" "}
            </Link>
            Account
          </p>
        </div>
      </div>
    )
  }

  console.log('hasAcces', hasAcces)

  if (!sites || sites.length === 0) {
    return (
      <div>
        <p className='font-normal text-sm text-slate-500'>Google Search Console Property</p>
        <div className='inline-flex w-full mt-1 justify-between px-4 py-3 rounded-xl border border-p-100 bg-primary-50/50 placeholder-gray-400 ring-p-500 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'>
          <p className="text-gray-500 font-normal">
            No properties found
          </p>
        </div>
      </div>
    )
  }

  console.log('sites', sites)

  return (
    <FormField
      control={form.control}
      name="gscUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel className='flex items-center gap-[6px]'>Google Search Console Property <InformationCircleIcon className='w-4 h-4 text-p-500' /></FormLabel>
          <FormInputSelect onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <FormInputSelectTrigger>
                <FormInputSelectValue placeholder="Select a property" />
              </FormInputSelectTrigger>
            </FormControl>
            <FormInputSelectContent>
              {sites.map((site) => (
                <FormInputSelectItem key={site.siteUrl} value={site.siteUrl}>
                  {site.siteUrl}
                </FormInputSelectItem>
              ))}
            </FormInputSelectContent>
          </FormInputSelect>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default UpdateWebsiteForm