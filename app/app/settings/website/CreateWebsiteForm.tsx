'use client'


import React, { useState, useTransition } from 'react'

import { z } from 'zod';
import { websiteInputSchema } from '@/src/interface-adapters/controllers/website/create-website.controller';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createWebsite } from '../actions';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../_components/form/SettingsForm';
import { InputFieldApp } from '@/app/_components/ui/inputFields';
// TODO: also add in settings form
import { FormError } from '@/app/(auth)/_forms/form-error';
import { FormSuccess } from '@/app/(auth)/_forms/form-success';

import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '../_components/SettingsCard';

const CreateWebsiteForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof websiteInputSchema>>({
    resolver: zodResolver(websiteInputSchema),
  });

  const onSubmit = async (values: z.infer<typeof websiteInputSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {

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
          <CardHeader>
            website
          </CardHeader>
          <CardContent className='space-y-3'>
            <FormField
              control={form.control}
              name="websiteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website project name</FormLabel>
                  <FormControl>
                    <InputFieldApp
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
                    <InputFieldApp
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
              name="gscUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Search Console url</FormLabel>
                  <FormControl>
                    <InputFieldApp
                      {...field}
                      disabled={isPending}
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateWebsiteForm