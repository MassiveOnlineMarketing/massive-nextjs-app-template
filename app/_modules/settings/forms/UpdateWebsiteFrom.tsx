'use client'

import React, { useTransition } from 'react'
import { useToast } from '@/app/_components/ui/toast/use-toast';

import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import useGoogleToken from "@/app/_modules/auth/hooks/useGoogleRefreshToken";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formInputUpdateWebsiteSchema } from '@/src/entities/models/website';
import { ConnectedGscProperties } from '@/src/application/api/search-console.api.types';
import { updateWebsite } from '@/app/_actions/website.actions';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormInputField, FormInputSelect, FormInputSelectContent, FormInputSelectItem, FormInputSelectTrigger, FormInputSelectValue } from '../components/form';
import GSCWrapper from './GSCWrapper';

import DeleteWebsiteButton from '../components/DeleteWebsiteButton';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '../components/SettingsCard';

import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/20/solid';



type DefaultValues = {
  id: string,
  websiteName: string,
  domainUrl: string,
  gscUrl: string | null,
}

const UpdateWebsiteForm = ({ defaultValues, gscProperties }: { defaultValues: DefaultValues, gscProperties?: ConnectedGscProperties[] }) => {
  const { hasAccess, isLoading } = useGoogleToken('search-console');
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const updateWebsiteInStore = useWebsiteDetailsStore(state => state.updateWebsite);

  const form = useForm<z.infer<typeof formInputUpdateWebsiteSchema>>({
    resolver: zodResolver(formInputUpdateWebsiteSchema),
    defaultValues: {
      id: defaultValues.id,
      websiteName: defaultValues.websiteName,
      domainUrl: defaultValues.domainUrl,
      gscUrl: defaultValues.gscUrl || null,
    }
  });

  const onFormSubmit = async (values: z.infer<typeof formInputUpdateWebsiteSchema>) => {
    startTransition(async () => {
      const res = await updateWebsite(values, defaultValues.id);

      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })      }

      if (res.updatedWebsite) {
        toast({
          title: "Success",
          description: "Website created successfully",
          variant: "success",
          icon: 'success'
        })
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

            <GSCWrapper hasAccess={hasAccess} isLoading={isLoading}>
              <FormField
                control={form.control}
                name="gscUrl"
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
                        {gscProperties ? (
                          gscProperties.map((site) => (
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
            </GSCWrapper>

            {/* <GoogleSearchConsolePropertyInputSelector hasAccess={hasAccess} isLoading={isLoading} sites={gscProperties} form={form} isPending={isPending} /> */}
            {form.formState.errors.gscUrl && <p className="text-sm font-medium text-red-500 dark:text-red-900">{form.formState.errors.gscUrl.message}</p>}

          </CardContent>
        </Card>

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