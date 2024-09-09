"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUp } from "@/app/_modules/auth/actions";
import { registerSchema } from "@/src/interface-adapters/controllers/auth/sign-up.controller";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

import { Button } from "@/app/_components/ui/button";
import { LoadingSpinnerSmall } from "@/app/_components/ui/loading-spinner";
import { InputFieldAppWithIcon } from "@/app/_components/ui/inputFields";

import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signUp(values).then((data) => {
        // @ts-ignore
        setError(data.error);
        // @ts-ignore
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <div className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <InputFieldAppWithIcon
                        Icon={UserIcon}
                        className="bg-transparent"
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
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
                      <InputFieldAppWithIcon
                        Icon={EnvelopeIcon}
                        className="bg-transparent"
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputFieldAppWithIcon
                        Icon={LockClosedIcon}
                        className="bg-transparent"
                        {...field}
                        disabled={isPending}
                        placeholder="●●●●●●"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button disabled={isPending} type="submit" className="mt-20 w-full text-violet-50 relative gradient-mask primary-button hover:text-white bg-primary-500 font-medium" size='default'>
            {isPending ? <LoadingSpinnerSmall /> : 'Create an account'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
