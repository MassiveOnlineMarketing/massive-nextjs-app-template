'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useGoogleToken from "@/app/_modules/auth/hooks/useGoogleRefreshToken";
import { useWebsiteDetailsStore } from '@/app/_stores/useWebsiteDetailsStore';
import { ConnectedGscProperties } from '@/src/application/api/search-console.api.types';

import { formInputCreateWebsiteSchema } from '@/src/entities/models/website';
import { createWebsite } from '@/app/_actions/website.actions';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormInputField, FormInputSelect, FormInputSelectContent, FormInputSelectItem, FormInputSelectTrigger, FormInputSelectValue } from '../components/form';
import GSCWrapper from './GSCWrapper';

import { useToast } from '@/app/_components/ui/toast/use-toast';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '../components/SettingsCard';

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const CreateWebsiteForm = ({ gscProperties }: { gscProperties?: ConnectedGscProperties[] }) => {
  const { hasAccess, isLoading } = useGoogleToken('search-console');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formInputCreateWebsiteSchema>>({
    resolver: zodResolver(formInputCreateWebsiteSchema),
    defaultValues: {
      gscUrl: null
    }
  });

  const addWebsiteToStore = useWebsiteDetailsStore(state => state.addWebsite);

  const onSubmit = async (values: z.infer<typeof formInputCreateWebsiteSchema>) => {
    startTransition(async () => {
      const res = await createWebsite(values);

      createWebsite(values)
        .then((res) => {
          if (res.error) {
            toast({
              title: "Error",
              description: res.error,
              variant: "destructive",
            })
          }

          if (res.createdWebsite) {
            addWebsiteToStore(res.createdWebsite);
            form.reset();
            toast({
              description: "Website created",
              variant: "success",
              icon: "success",
            })
            router.push(`/app/settings/website/${res.createdWebsite.id}`);
          }
        });
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mx-6 mb-5'>
          <CardHeader className='flex flex-row items-center gap-1.5'>
            <GlobeAltIcon className='w-4 h-4' />
            <p className='font-medium'>Enter your website details</p>
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
                      disabled={isPending}
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

        <div className='px-6 mb-6 flex'>
          <Button
            disabled={isPending}
            type="submit"
            className='ml-auto'
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  )
}


export default CreateWebsiteForm