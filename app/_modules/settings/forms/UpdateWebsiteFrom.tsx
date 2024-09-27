'use client'

import React, { useState, useTransition } from 'react'

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useGoogleToken from "@/app/_modules/auth/hooks/useGoogleRefreshToken";
import { formInputUpdateWebsiteSchema } from '@/src/entities/models/website';
import { updateWebsite } from '@/app/_actions/website.actions';

import { Form, FormControl, FormError, FormSuccess, FormField, FormItem, FormLabel, FormMessage, FormInputField, FormInputSelect, FormInputSelectContent, FormInputSelectItem, FormInputSelectTrigger, FormInputSelectValue } from '../components/form';
import { GoogleSearchConsolePropertyInputSelector } from './GSCconnectionButton';

import DeleteWebsiteButton from '../components/DeleteWebsiteButton';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '../components/SettingsCard';

import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ConnectedGscProperties } from '@/src/application/api/search-console.api.types';



type DefaultValues = {
  id: string,
  websiteName: string,
  domainUrl: string,
  gscUrl: string | null,
}

const UpdateWebsiteForm = ({ defaultValues, gscProperties }: { defaultValues: DefaultValues, gscProperties?: ConnectedGscProperties[] }) => {
  // TODO: search console access, also check ui styles
  const { hasAccess, isLoading } = useGoogleToken('search-console');

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
        <Card className='mb-6'>
          <CardHeader className='py-3 flex flex-row items-center justify-between'>
            <div className='theme-t-p flex flex-row items-center gap-1.5'>
              <GlobeAltIcon className='w-4 h-4 ' />
              <p className='font-medium'>Website Settings</p>
            </div>
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

            <GoogleSearchConsolePropertyInputSelector hasAccess={hasAccess} isLoading={isLoading} sites={gscProperties} form={form} isPending={isPending} />

          </CardContent>
        </Card>

        <FormError message={error} />
        <FormSuccess message={success} />

        <div className='flex ml-auto'>
          <Button
            disabled={isPending}
            onClick={() => form.reset({
              id: defaultValues.id,
              websiteName: defaultValues.websiteName,
              domainUrl: defaultValues.domainUrl,
              gscUrl: defaultValues.gscUrl || undefined,
            })}
            type="reset"
            size='default'
            variant='outline'
            className='ml-auto'
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            size='default'
            variant='outline'
            className='ml-2'
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  )
}


export default UpdateWebsiteForm