'use client';

import React from 'react'
import { Form, FormControl, FormDescription, FormError, FormField, FormInputField, FormItem, FormLabel, FormMessage, FormSuccess, FormInputSelect, FormInputSelectTrigger, FormInputSelectValue, FormInputSelectContent, FormInputSelectItem } from '../settings/_components/form'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const testSchema = z.object({
  test: z.string().nonempty(),
  test2: z.string().nonempty(),
  test3: z.string().nonempty(),
  testSelect: z.string().nonempty(),
  testSelect2: z.string().nonempty(),
})

const FormStuff = () => {
  const form = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      test: ''
    },

  })
  return (
    <div><h1 className='text-xl font-semibold mt-6 mb-2'>Form stuff</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => console.log(values))}>
          <div className='grid grid-cols-3 gap-6'>
            <FormField
              control={form.control}
              name='test'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default</FormLabel>
                  <FormControl>
                    <FormInputField {...field} disabled={false} placeholder='Default' />
                  </FormControl>
                  <FormDescription>Default description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='test2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Errors</FormLabel>
                  <FormControl>
                    <FormInputField {...field} placeholder='Default Errors' />
                  </FormControl>
                  <FormDescription>Default Errors description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='test3'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disabled form / submitting</FormLabel>
                  <FormControl>
                    <FormInputField {...field} disabled placeholder='Disabled form / submitting' />
                  </FormControl>
                  <FormDescription>Disabled form / submitting description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-3 gap-6 mt-3'>
            <FormField
              control={form.control}
              name="testSelect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-[6px]'>Google Search Console Property <InformationCircleIcon className='w-4 h-4 text-p-500' /></FormLabel>
                  <FormInputSelect onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                    <FormControl>
                      <FormInputSelectTrigger>
                        <FormInputSelectValue placeholder="Select a property" />
                      </FormInputSelectTrigger>
                    </FormControl>
                    <FormInputSelectContent>
                      <FormInputSelectItem value="noWebsite">Don&apos;t use a property</FormInputSelectItem>
                      <FormInputSelectItem value="m@example.com">m@example.com</FormInputSelectItem>
                      <FormInputSelectItem value="m@google.com">m@google.com</FormInputSelectItem>
                      <FormInputSelectItem value="m@support.com">m@support.com</FormInputSelectItem>
                    </FormInputSelectContent>
                  </FormInputSelect>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testSelect2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-[6px]'>Google Search Console Property <InformationCircleIcon className='w-4 h-4 text-p-500' /></FormLabel>
                  {/* //! voeg open={true} toe aan FormInputSelect om hem altijd te openen, makkelijk om ui changes the checken  */}
                  <FormInputSelect onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                    <FormControl>
                      <FormInputSelectTrigger>
                        <FormInputSelectValue placeholder="Select a property" />
                      </FormInputSelectTrigger>
                    </FormControl>
                    <FormInputSelectContent>
                      <FormInputSelectItem value="noWebsite">Don&apos;t use a property</FormInputSelectItem>
                      <FormInputSelectItem value="m@example.com">m@example.com</FormInputSelectItem>
                      <FormInputSelectItem value="m@google.com">m@google.com</FormInputSelectItem>
                      <FormInputSelectItem value="m@support.com">m@support.com</FormInputSelectItem>
                    </FormInputSelectContent>
                  </FormInputSelect>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className='space-y-3 mt-3'>
        <FormSuccess message='Success message' />
        <FormError message='Error message' />
      </div></div>
  )
}

export default FormStuff