'use client'

import React, { useState, useTransition } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formInputCreateLocationSchema } from '@/src/entities/models/location'

import { Form, FormControl, FormField, FormInputField, FormItem, FormLabel, FormMessage } from '.'


const FormTemplate = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formInputCreateLocationSchema>>({
    resolver: zodResolver(formInputCreateLocationSchema),
  });

  const onSubmit = async (values: z.infer<typeof formInputCreateLocationSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      // const res = await createLocation(values);

      // res checks
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website project name</FormLabel>
              <FormControl>
                {/* @ts-ignore */}
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
      </form>
    </Form>
  )
}

export default FormTemplate
