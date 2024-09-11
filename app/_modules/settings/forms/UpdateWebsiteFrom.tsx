'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';

import { z } from 'zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formInputUpdateWebsiteSchema } from '@/src/entities/models/website';
import { updateWebsite } from '@/app/_actions/website.actions';

import { Form, FormControl, FormError, FormSuccess, FormField, FormItem, FormLabel, FormMessage, FormInputField, FormInputSelect, FormInputSelectContent, FormInputSelectItem, FormInputSelectTrigger, FormInputSelectValue } from '../components/form';

import DeleteWebsiteButton from '../components/DeleteWebsiteButton';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '../components/SettingsCard';

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
  // TODO: search console access, also check ui styles
  const HAS_ACCESS = true


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

  const updateWebsiteInStore = useWebsiteDetailsStore(state => state.updateWebsite);

  const form = useForm<z.infer<typeof formInputUpdateWebsiteSchema>>({
    resolver: zodResolver(formInputUpdateWebsiteSchema),
    defaultValues: {
      id: defaultValues.id,
      websiteName: defaultValues.websiteName,
      domainUrl: defaultValues.domainUrl,
      gscUrl: defaultValues.gscUrl || undefined,
    }
  });

  const onFormSubmit = async (values: z.infer<typeof formInputUpdateWebsiteSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await updateWebsite(values, defaultValues.id);

      if (res.error) {
        setError(res.error);
      }

      if (res.updatedWebsite) {
        setSuccess("Website updated successfully");
        updateWebsiteInStore(res.updatedWebsite);
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <Card className='mx-6 mb-5'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-[6px] text-p-800'>
              <GlobeAltIcon className='w-4 h-4 ' />
              <p className='font-medium'>Website Settings</p>
            </div>
            {/* // TODO: add as delete button in the Card */}
            <DeleteWebsiteButton websiteId={defaultValues.id} />
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

            <GoogleSearchConsolePropertyInputSelector hasAcces={HAS_ACCESS} sites={gscProperties} form={form} isPending={isPending} />

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

interface GoogleSearchConsolePropertyInputSelectorProps {
  hasAcces: boolean;
  isLoading?: boolean;
  sites: PythonApiSite[] | null;
  form: UseFormReturn<z.infer<typeof formInputUpdateWebsiteSchema>>;
  isPending: boolean;
}
// ! if updating this component, make sure to also update the CreateWebsiteForm component
const GoogleSearchConsolePropertyInputSelector: React.FC<GoogleSearchConsolePropertyInputSelectorProps>  = ({ hasAcces, isLoading, sites, form, isPending }) => {

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

  return (
    <FormField
      control={form.control}
      name="gscUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel className='flex items-center gap-[6px]'>Google Search Console Property <InformationCircleIcon className='w-4 h-4 text-p-500' /></FormLabel>
          <FormInputSelect onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
            <FormControl>
              <FormInputSelectTrigger disabled={isPending}>
                <FormInputSelectValue placeholder="Select a property" />
              </FormInputSelectTrigger>
            </FormControl>
            <FormInputSelectContent>
              {sites.map((site) => (
                <FormInputSelectItem key={site.siteUrl} value={site.siteUrl}>
                  {site.siteUrl}
                </FormInputSelectItem>
              ))}
              <FormInputSelectItem value="noWebsite">Don&apos;t use a property</FormInputSelectItem>
            </FormInputSelectContent>
          </FormInputSelect>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default UpdateWebsiteForm