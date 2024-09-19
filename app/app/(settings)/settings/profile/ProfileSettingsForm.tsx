'use client';

import React, { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react';

import { ExtendedUser } from '@/next-auth';

import { z } from 'zod';
import { updateUserDetailtsSchema } from '@/src/interface-adapters/controllers/auth/update-user-details.controller';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateUserDetails, UpdateUserDetailsResponse } from '@/app/_modules/auth/actions';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormSuccess, FormError, FormInputField } from '../../../../_modules/settings/components/form';

import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardHeader } from '../../../../_modules/settings/components/SettingsCard'
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/20/solid';


type UpdateUserDetailtsSchema = z.infer<typeof updateUserDetailtsSchema>;

const ProfileSettingsForm = ({ user }: { user: ExtendedUser }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { update } = useSession();

  const form = useForm<z.infer<typeof updateUserDetailtsSchema>>({
    resolver: zodResolver(updateUserDetailtsSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: undefined,
      passwordConfirmation: undefined,
      currentPassword: undefined
    },
  });


  const onSubmit = async (values: UpdateUserDetailtsSchema) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      if (values.password === '' && values.passwordConfirmation === '' && values.currentPassword === '') {
        delete values.password;
        delete values.passwordConfirmation;
        delete values.currentPassword;
      }

      const res: UpdateUserDetailsResponse = await updateUserDetails(values);

      if (res.error) {
        setError(res.error);
        return;
      }

      if (res.success) {
        setSuccess(res.success);
      }

      if (res.user) {
        form.setValue('password', null);
        form.setValue('passwordConfirmation', null);
        form.setValue('currentPassword', null);
        setSuccess("Profile updated successfully");

        await update({ user: { name: res.user.name, email: res.user.email } })
      }
    });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <Card className='mx-6 mb-5'>
          <CardHeader className='flex flex-row items-center gap-1.5'>
            <UserCircleIcon className='w-4 h-4' />
            <p className='font-medium'>Profile</p>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-3'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <FormInputField
                      {...field}
                      disabled={isPending}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Profile */}
        {user.loginProvider === "credentials" && (
          <Card className='mx-6'>
            <CardHeader className='theme-t-p flex flex-row items-center gap-1.5'>
              <LockClosedIcon className='w-4 h-4' />
              <p className='font-medium'>Password</p>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className='pb-[12px]'>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <FormInputField
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <FormInputField
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <FormInputField
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className='p-6 w-full flex'>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button
            disabled={isPending}
            onClick={() => form.reset({
              name: user.name,
              email: user.email,
              password: undefined,
              passwordConfirmation: undefined,
              currentPassword: undefined
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
            {isPending ? "Saving..." : "Save"}  
          </Button>
        </div>

      </form>
    </Form>
  )
}



export default ProfileSettingsForm