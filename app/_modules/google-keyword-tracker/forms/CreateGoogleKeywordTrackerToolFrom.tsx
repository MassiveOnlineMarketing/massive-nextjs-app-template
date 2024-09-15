'use client'

import React, { useState, useTransition } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { DAYS_OF_WEEK, formInputCreateGoogleKeywordTrackerSchema } from '@/src/entities/models/google-keyword-tracker'

import { Form, FormField, FormItem, FormLabel, FormControl, TextareaApp, FormMessage } from '@/app/_modules/settings/components/form'
import { Card, CardContent, CardHeader } from "@/app/_modules/settings/components/SettingsCard"
import { Button } from '@/app/_components/ui/button'

// import { Form, FormControl, FormField, FormInputField, FormItem, FormLabel, FormMessage } from 
const CreateGoogleKeywordTrackerToolFrom = ({ locationId }: { locationId: string }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formInputCreateGoogleKeywordTrackerSchema>>({
    resolver: zodResolver(formInputCreateGoogleKeywordTrackerSchema),
    defaultValues: {
      locationId: locationId,
    }
  });

  const onSubmit = async (values: z.infer<typeof formInputCreateGoogleKeywordTrackerSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      console.log(values)
      // const res = await createLocation(values);

      // res checks
    })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mx-6 mb-6'>
          <CardHeader>
            Setup Google Keyword Tracker
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name='keywords'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <TextareaApp
                      {...field}
                      disabled={isPending}
                      rows={5}
                      placeholder='Enter keywords separated by enter'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='refresh'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refresh</FormLabel>
                  <FormControl>
                    <div>
                      {DAYS_OF_WEEK.map((day) => (
                        <div key={day.value} className='flex items-center gap-2'>
                          <input
                            type='checkbox'
                            checked={field.value?.includes(day.value) || false}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...(field.value || []), day.value]
                                : (field.value || []).filter((v) => v !== day.value);
                              form.setValue('refresh', newValue);
                            }}
                          />
                          <label>{day.label}</label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className='flex mx-6 mb-6'>
          <Button
            type="submit"
            disabled={isPending}
            className="ml-auto"
            variant="outline"
            size="default"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateGoogleKeywordTrackerToolFrom